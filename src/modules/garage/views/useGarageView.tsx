import * as Yup from 'yup';

import {CarWithoutId} from "@moduleGarage/static/types";
import {
  useCreateCarMutation,
  useDeleteCarMutation,
  useGetCarsQuery
} from "@/services/api/controllers/asyncRaceApi/modules/carApi";
import {setCars, setTotalCount} from "@moduleGarage/store";
import {useAppDispatch} from "@/store/hooks.ts";
import {ChangeEvent, useState} from "react";
import {createRandomCar} from "@/utils";

interface ErrorState {
  name: string;
  color: string;
}


const useGarageView = () => {
  const [createCar] = useCreateCarMutation();
  const {refetch} = useGetCarsQuery({page: 1, limit: 7});
  const [deleteCar] = useDeleteCarMutation();

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

  const [values, setValues] = useState({name: '', color: '#ffffff'});
  const [errors, setErrors] = useState({name: '', color: ''});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
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

  // Handle form submission
  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    try {
      await validationSchema.validate(values, {abortEarly: false});
      console.log('Validated Data:', values);
    } catch (err: any) {
      const validationErrors: Partial<ErrorState> = {};
      err.inner.forEach((error: any) => {
        validationErrors[error.path as keyof ErrorState] = error.message;
      });
      setErrors({
        ...errors,
        ...validationErrors,
      });
    }
  };

//delete car
  const sendCarDeleteRequest = async (id: number): Promise<void> => {
    try {
      await deleteCar(id);

      const refetchResponse = await refetch();

      if (refetchResponse.data) {
        const {cars, totalCount} = refetchResponse.data;
        dispatch(setCars(cars));
        dispatch(setTotalCount(totalCount));

        setIsLoadingCreatedCars(false);
      }
    } catch (e) {
      console.log(e);
    }
  }


  return {
    values,
    errors,
    handleChange,
    handleSubmit,
    handleGenerateCars,
    isLoadingCreatedCars,
    sendCarDeleteRequest
  }
}

export default useGarageView;