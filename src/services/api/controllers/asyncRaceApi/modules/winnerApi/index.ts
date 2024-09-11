import {asyncRaceApi} from '@/services/api/controllers/asyncRaceApi';

import {Winner, WInnerWithoutId} from "@moduleWinners/static/types";
import {
  GetWinnersQueryParams,
  Id,
  WinnersResponse,
} from "@/services/api/controllers/asyncRaceApi/asyncRaceApi.types.ts";

export const winnerApi = asyncRaceApi.injectEndpoints({
  endpoints: (builder) => ({
    getWinners: builder.query<WinnersResponse, GetWinnersQueryParams>({
      query: ({page = 1, limit = 10, sort = 'id', order = 'ASC'}: GetWinnersQueryParams) =>
        `/winners?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`,
    }),
    getWinner: builder.query<Winner, Id>({
      query: (id: Id) => `/winners/${id}`,
    }),
    createWinner: builder.mutation<Winner, Winner>({
      query: (newWinner: Winner) => ({
        url: '/winners',
        method: 'POST',
        body: newWinner,
      }),
    }),
    deleteWinner: builder.mutation<void, Id>({
      query: (id: Id) => ({
        url: `/winners/${id}`,
        method: 'DELETE',
      }),
    }),
    updateWinner: builder.mutation<Winner, { id: Id, updatedWinner: WInnerWithoutId }>({
      query: ({id, updatedWinner}) => ({
        url: `/winners/${id}`,
        method: 'PUT',
        body: updatedWinner,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetWinnersQuery,
  useGetWinnerQuery,
  useCreateWinnerMutation,
  useDeleteWinnerMutation,
  useUpdateWinnerMutation,
} = winnerApi;
