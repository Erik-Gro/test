
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Seminar {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  photo: string;
}

export const seminarsApi = createApi({
  reducerPath: 'seminarsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/' }),
  tagTypes: ['Seminar'],
  endpoints: (builder) => ({
    getSeminars: builder.query<Seminar[], void>({
      query: () => 'seminars',
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: 'Seminar' as const, id })), { type: 'Seminar', id: 'LIST' }]
          : [{ type: 'Seminar', id: 'LIST' }],
    }),
    deleteSeminar: builder.mutation<{ success: boolean; id: number }, number>({
      query: (id) => ({
        url: `seminars/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Seminar', id }, { type: 'Seminar', id: 'LIST' }],
    }),
    updateSeminar: builder.mutation<Seminar, Partial<Seminar>>({
      query: ({ id, ...patch }) => ({
        url: `seminars/${id}`,
        method: 'PATCH',
        body: patch,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Seminar', id }],
    }),
  }),
});

export const { useGetSeminarsQuery, useDeleteSeminarMutation, useUpdateSeminarMutation } = seminarsApi;
