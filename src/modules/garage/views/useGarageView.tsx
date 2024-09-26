import * as Yup from 'yup';

import { CarWithoutId } from '@moduleGarage/static/types';
import debounceFn from 'debounce-fn';
import {
  useCreateCarMutation,
  useUpdateCarMutation,
} from '@/services/api/controllers/asyncRaceApi/modules/carApi';
import { useAppSelector } from '@/store/hooks.ts';
import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { createRandomCar } from '@/utils';
import { Id } from '@/services/api/controllers/asyncRaceApi/asyncRaceApi.types.ts';
import useFetchAndUpdateCars from '@moduleGarage/hooks/useFetchAndUpdateCars.ts';
import { toast } from 'react-toastify';

interface ErrorState {
  name: string;
  color: string;
}

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .max(15, 'Name must be less than or equal to 15 characters')
    .required('Name is required'),
  color: Yup.string()
    .matches(/^#[0-9A-F]{6}$/i, 'Color must be in HEX format')
    .required('Color is required'),
});

const useGarageView = () => {
  let selectedCar = useAppSelector((state) => state.garage.selectedCar);
  let selectedCarId = selectedCar ? selectedCar.id : null;

  const [createCar] = useCreateCarMutation();
  const [updateCar] = useUpdateCarMutation();

  const [createCarValues, setCreateCarValues] = useState({
    name: '',
    color: '#ffffff',
  });
  const [createCarErrors, setCreateCarErrors] = useState<ErrorState>({
    name: '',
    color: '',
  });
  const [updateCarErrors, setUpdateCarErrors] = useState<ErrorState>({
    name: '',
    color: '',
  });
  const [updateCarValues, setUpdateCarValues] = useState<CarWithoutId>({
    name: '',
    color: '#ffffff',
  });
  const [isLoadingCreatedCars, setIsLoadingCreatedCars] = useState(false);

  const fetchAndUpdateCars = useFetchAndUpdateCars();

  const sendCarCreateRequest = async (car: CarWithoutId): Promise<void> => {
    try {
      await createCar(car);
    } catch (e) {
      console.error(e);
    }
  };

  const handleGenerateCars = async () => {
    setIsLoadingCreatedCars(true);
    const randomCars: CarWithoutId[] = Array.from(
      { length: 100 },
      createRandomCar,
    );
    const promises = randomCars.map((car) => sendCarCreateRequest(car));

    try {
      await Promise.all(promises);
      await fetchAndUpdateCars();

      setIsLoadingCreatedCars(false);
      toast.success('100 cars have been successfully created!');
    } catch (e) {
      console.error(e);
      setIsLoadingCreatedCars(false);
    }
  };

  const debouncedChange = debounceFn(
    (formType: 'create' | 'update', value: string) => {
      if (formType === 'create') {
        setCreateCarValues((prevValues) => ({
          ...prevValues,
          color: value,
        }));
      } else if (formType === 'update') {
        setUpdateCarValues((prevValues) => ({
          ...prevValues,
          color: value,
        }));
      }
    },
    { wait: 300 },
  );

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    setValues: Dispatch<SetStateAction<CarWithoutId>>,
    values: CarWithoutId,
    setErrors: Dispatch<SetStateAction<ErrorState>>,
    errors: ErrorState,
    formType: 'create' | 'update',
  ) => {
    const { name, value } = e.target;

    if (name === 'color') {
      debouncedChange(formType, value);
    } else {
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
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleInputChange(
      e,
      setCreateCarValues,
      createCarValues,
      setCreateCarErrors,
      createCarErrors,
      'create',
    );
  };

  const handleUpdateChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleInputChange(
      e,
      setUpdateCarValues,
      updateCarValues,
      setUpdateCarErrors,
      updateCarErrors,
      'update',
    );
  };

  const sendUpdateCarRequest = async (
    id: Id,
    car: CarWithoutId,
  ): Promise<void> => {
    try {
      await updateCar({ id, updatedCar: car });
    } catch (e) {
      console.log(e);
    }
  };

  const handleFormSubmit = async (
    e: FormEvent,
    values: CarWithoutId,
    setErrors: Dispatch<SetStateAction<ErrorState>>,
    action: (values: CarWithoutId) => Promise<void>,
    resetValues: () => void,
  ) => {
    e.preventDefault();
    try {
      await validationSchema.validate(values, { abortEarly: false });
      await action(values);

      resetValues();
      setErrors({ name: '', color: '' });

      await fetchAndUpdateCars();
    } catch (err) {
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
      () => setCreateCarValues({ name: '', color: '#ffffff' }),
    )
      .then(() => {
        toast.success('The car was successfully created');
      })
      .catch(() => {
        toast.success('error when creating car');
      });
  };

  const handleUpdateSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (selectedCarId === null) {
      toast.error("You haven't selected a car!");
      return;
    }

    await handleFormSubmit(
      e,
      updateCarValues,
      setUpdateCarErrors,
      () => sendUpdateCarRequest(selectedCarId!, updateCarValues),
      () => setUpdateCarValues({ name: '', color: '#ffffff' }),
    )
      .then(() => {
        toast.success('The car was successfully updated');
      })
      .catch(() => {
        toast.success('error when updating car');
      });
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
  };
};

export default useGarageView;
