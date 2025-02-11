import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const levelApi = createApi({
    reducerPath: 'levelApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://ravanguliyeff-001-site1.ntempurl.com/api/' }),
    endpoints: (builder) => ({
        getAllLevel: builder.query({
            query: () => `level/getall`,
        }),
        postLevel: builder.mutation({
            query: (newLevel) => ({
                url: `level/create`,
                method: 'POST',
                body: newLevel,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }),
        })
    }),
})

export const { useGetAllLevelQuery, usePostLevelMutation } = levelApi