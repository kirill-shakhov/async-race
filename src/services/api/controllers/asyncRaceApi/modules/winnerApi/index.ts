import { Winner } from '@moduleWinners/static/types';

import { asyncRaceApi } from '@/services/api/controllers/asyncRaceApi';

import {
  GetWinnersQueryParams,
  Id,
  WinnersQueryResponse,
} from '@/services/api/controllers/asyncRaceApi/asyncRaceApi.types.ts';
import {
  DEFAULT_WINNERS_PER_PAGE,
  INITIAL_WINNERS_PAGE,
} from '@/services/api/controllers/asyncRaceApi/modules/winnerApi/WinnersApi.constants.ts';
import { SortDirection, SortOptions } from '@/shared/types';

export const winnerApi = asyncRaceApi.injectEndpoints({
  endpoints: (builder) => ({
    getWinners: builder.query<WinnersQueryResponse, GetWinnersQueryParams>({
      query: ({
        page = INITIAL_WINNERS_PAGE,
        limit = DEFAULT_WINNERS_PER_PAGE,
        sort = SortOptions.ID,
        order = SortDirection.ASC,
      }: GetWinnersQueryParams) =>
        `/winners?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`,
      transformResponse(winners: Winner[], meta) {
        return {
          winners,
          totalCount: Number(meta?.response?.headers.get('X-Total-Count')),
        };
      },
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
    updateWinner: builder.mutation<Winner, Winner>({
      query: ({ id, time, wins }) => ({
        url: `/winners/${id}`,
        method: 'PUT',
        body: { id, time, wins },
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

  useLazyGetWinnerQuery,
  useLazyGetWinnersQuery,
} = winnerApi;
