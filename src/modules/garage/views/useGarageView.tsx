import * as Yup from 'yup';

import {Car, CarWithoutId} from "@moduleGarage/static/types";
import {
  useCreateCarMutation,
  useDeleteCarMutation,
  useGetCarsQuery, useUpdateCarMutation
} from "@/services/api/controllers/asyncRaceApi/modules/carApi";
import {clearCars, setCars, setTotalCount} from "@moduleGarage/store";
import {useAppDispatch, useAppSelector} from "@/store/hooks.ts";
import {ChangeEvent, Dispatch, FormEvent, SetStateAction, useEffect, useState} from "react";
import {createRandomCar} from "@/utils";
import {Id} from "@/services/api/controllers/asyncRaceApi/asyncRaceApi.types.ts";

interface ErrorState {
  name: string;
  color: string;
}


const useGarageView = () => {

  let selectedCar = useAppSelector(state => state.garage.selectedCar);
  let currentPage = useAppSelector(state => state.garage.currentPage);
  let selectedCarId = selectedCar ? selectedCar.id : null;

  const [createCar] = useCreateCarMutation();
  const {refetch} = useGetCarsQuery({page: 1, limit: 7});
  const [updateCar] = useUpdateCarMutation();

  const [createCarValues, setCreateCarValues] = useState({name: '', color: '#ffffff'});
  const [createCarErrors, setCreateCarErrors] = useState<ErrorState>({name: '', color: ''});
  const [updateCarErrors, setUpdateCarErrors] = useState<ErrorState>({name: '', color: ''});
  const [updateCarValues, setUpdateCarValues] = useState<CarWithoutId>({name: '', color: '#ffffff'});
  const [isLoadingCreatedCars, setIsLoadingCreatedCars] = useState(false);

  const dispatch = useAppDispatch();

  //generate 100 random cars
  const sendCarCreateRequest = async (car: CarWithoutId): Promise<void> => {
    try {
      await createCar(car);
    } catch (e) {
      console.error(e);
    }
  }

  const handleGenerateCars = async () => {
    setIsLoadingCreatedCars(true);
    const randomCars: CarWithoutId[] = Array.from({length: 100}, createRandomCar);
    const promises = randomCars.map((car) => sendCarCreateRequest(car));

    try {
      await Promise.all(promises);
      const refetchResponse = await refetch();

      if (refetchResponse.data) {
        const {cars, totalCount} = refetchResponse.data;
        dispatch(setCars(cars));
        dispatch(setTotalCount(totalCount));

        setIsLoadingCreatedCars(false);
      }
    } catch (e) {
      console.error(e);
      setIsLoadingCreatedCars(false);
    }
  }


  // create a car
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, 'Name must be at least 2 characters')
      .max(50, 'Name must be less than or equal to 50 characters')
      .required('Name is required'),
    color: Yup.string()
      .matches(/^#[0-9A-F]{6}$/i, 'Color must be in HEX format')
      .required('Color is required'),
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    setValues: Dispatch<SetStateAction<CarWithoutId>>,
    values: CarWithoutId,
    setErrors: Dispatch<SetStateAction<ErrorState>>,
    errors: ErrorState
  ) => {
    const {name, value} = e.target;

    setValues({
      ...values,
      [name]: value,
    });

    if (errors[name as keyof ErrorState]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };


  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleInputChange(e, setCreateCarValues, createCarValues, setCreateCarErrors, createCarErrors);
  };

  const handleUpdateChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleInputChange(e, setUpdateCarValues, updateCarValues, setUpdateCarErrors, updateCarErrors);
  };


  const sendUpdateCarRequest = async (id: Id, car: CarWithoutId): Promise<void> => {
    try {
      await updateCar({id, updatedCar: car});
    } catch (e) {
      console.log(e);
    }
  }

  const handleFormSubmit = async (
    e: FormEvent,
    values: CarWithoutId,
    setErrors: Dispatch<SetStateAction<ErrorState>>,
    action: (values: CarWithoutId) => Promise<void>,
    resetValues: () => void
  ) => {
    e.preventDefault();
    try {
      await validationSchema.validate(values, {abortEarly: false});
      await action(values);
      resetValues();
      setErrors({name: '', color: ''});

      await dispatch(clearCars());
      const refetchResponse = await refetch({ currentPage });

      if (refetchResponse.data) {
        const { cars, totalCount } = refetchResponse.data;
        dispatch(setCars(cars));
        dispatch(setTotalCount(totalCount));
      }
    } catch (err: any) {
      if (err instanceof Yup.ValidationError) {
        const validationErrors: Partial<ErrorState> = {};
        err.inner.forEach((error) => {
          validationErrors[error.path as keyof ErrorState] = error.message;
        });
        setErrors(validationErrors as ErrorState);
      } else {
        console.error(err);
      }
    }
  };


  const handleSubmit = async (e: FormEvent) => {
    await handleFormSubmit(
      e,
      createCarValues,
      setCreateCarErrors,
      sendCarCreateRequest,
      () => setCreateCarValues({name: '', color: '#ffffff'})
    );
  };

  const handleUpdateSubmit = async (e: FormEvent) => {
    if (selectedCarId === null) {
      alert('Вы не выбрали машину!');
      return;
    }

    await handleFormSubmit(
      e,
      updateCarValues,
      setUpdateCarErrors,
      () => sendUpdateCarRequest(selectedCarId!, updateCarValues),
      () => setUpdateCarValues({name: '', color: '#ffffff'})
    );
  };


  useEffect(() => {
    if (selectedCar) {
      setUpdateCarValues({
        name: selectedCar.name,
        color: selectedCar.color,
      });
    }
  }, [selectedCar]);


  return {
    createCarValues,
    createCarErrors,
    handleChange,
    handleSubmit,

    handleGenerateCars,
    isLoadingCreatedCars,

    updateCarValues,
    updateCarErrors,
    handleUpdateChange,
    handleUpdateSubmit,
  }
}

export default useGarageView;