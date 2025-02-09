import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const levelApi = createApi({
    reducerPath: 'levelApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://ravanguliyeff-001-site1.ntempurl.com/api/' }),
    endpoints: (builder) => ({
        getAllLevel: builder.query({
            query: () => `level/getall`,
        }),
    }),
})

export const { useGetAllLevelQuery } = levelApi