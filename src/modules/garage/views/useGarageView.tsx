import {CarWithoutId} from "@moduleGarage/static/types";
import {useCreateCarMutation} from "@/services/api/controllers/asyncRaceApi/modules/carApi";
import {createRandomCar} from "@/utils/createRandomCar/createRandomCar.ts";

const useGarageView = () => {
  const [createCar] = useCreateCarMutation();

  const sendCarCreateRequest = async (car: CarWithoutId): Promise<void> => {
    try {
      await createCar(car);

    } catch (e) {
      console.error(e);
    }
  }


  const handleGenerateCars = async () => {
    const randomCars: CarWithoutId[] = Array.from({length: 100}, createRandomCar);
    const promises = randomCars.map((car) => sendCarCreateRequest(car));

    try {
      await Promise.all(promises);
    } catch (e) {
      console.error(e);
    }
  }


  return {handleGenerateCars}
}

export default useGarageView;