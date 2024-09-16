import {asyncRaceApi} from '@/services/api/controllers/asyncRaceApi';

import {
  DEFAULT_GARAGE_CARS_PER_PAGE,
  INITIAL_GARAGE_PAGE,
} from './CarApi.constants.ts';

import {
  CarDriveData, CarsQueryResponse,
  CarsResponse,
  CarStatus,
  GetCarsQueryParams,
  Id,
} from '@/services/api/controllers/asyncRaceApi/asyncRaceApi.types.ts';
import {Car, CarWithoutId} from '@moduleGarage/static/types';

export const carApi = asyncRaceApi.injectEndpoints({
  endpoints: (builder) => ({
    getCars: builder.query<CarsQueryResponse, GetCarsQueryParams>({
      query: ({page = INITIAL_GARAGE_PAGE, limit = DEFAULT_GARAGE_CARS_PER_PAGE}) =>
        `/garage?_page=${page}&_limit=${limit}`,
      transformResponse(cars: Car[], meta) {
        return {cars, totalCount: Number(meta?.response?.headers.get('X-Total-Count'))}
      }
    }),
    getCar: builder.query<Car, Id>({
      query: (id) => `/garage/${id}`,
    }),
    createCar: builder.mutation<Car, CarWithoutId>({
      query: (newCar) => ({
        url: '/garage',
        method: 'POST',
        body: newCar,
      }),
    }),
    deleteCar: builder.mutation<void, Id>({
      query: (id) => ({
        url: `/garage/${id}`,
        method: 'DELETE',
      }),
    }),
    updateCar: builder.mutation<Car, { id: Id; updatedCar: CarWithoutId }>({
      query: ({id, updatedCar}) => ({
        url: `/garage/${id}`,
        method: 'PUT',
        body: updatedCar
      }),
    }),
    startStopCarEngine: builder.mutation<CarDriveData, { id: Id; status: CarStatus }>({
      query: ({id, status}) => ({
        url: `/engine?id=${id}&status=${status}`,
        method: 'PATCH',
      }),
    }),
    driveCar: builder.mutation<{ status: string }, Id>({
      query: (id) => ({
        url: `/engine?id=${id}&status=drive`,
        method: 'PATCH',
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetCarsQuery,
  useGetCarQuery,
  useCreateCarMutation,
  useDeleteCarMutation,
  useUpdateCarMutation,
  useStartStopCarEngineMutation,
  useDriveCarMutation,
} = carApi;
