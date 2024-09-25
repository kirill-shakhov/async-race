import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Создаем общий API slice
export const asyncRaceApi = createApi({
  reducerPath: 'asyncRaceApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}`,
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  endpoints: () => ({}),
});
