import {CarWithoutId} from "@moduleGarage/static/types";
import {useCreateCarMutation, useGetCarsQuery} from "@/services/api/controllers/asyncRaceApi/modules/carApi";
import {createRandomCar} from "@/utils/createRandomCar/createRandomCar.ts";
import {setCars, setTotalCount} from "@moduleGarage/store";
import {useAppDispatch} from "@/store/hooks.ts";
import {useState} from "react";

const useGarageView = () => {
  const [createCar] = useCreateCarMutation();
  const {refetch} = useGetCarsQuery({page: 1, limit: 7});

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

  return {
    handleGenerateCars,
    isLoadingCreatedCars
  }
}

export default useGarageView;