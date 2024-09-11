import {asyncRaceApi} from '@/services/api/controllers/asyncRaceApi';

import {
  CarDriveData,
  CarsResponse,
  CarStatus,
  GetCarsQueryParams,
  Id,
} from '@/services/api/controllers/asyncRaceApi/asyncRaceApi.types.ts';
import {Car, CarWithoutId} from '@moduleGarage/static/types';

export const carApi = asyncRaceApi.injectEndpoints({
  endpoints: (builder) => ({
    getCars: builder.query<CarsResponse, GetCarsQueryParams>({
      query: ({page = 1, limit = 10}) =>
        `/garage?_page=${page}&_limit=${limit}`,
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
