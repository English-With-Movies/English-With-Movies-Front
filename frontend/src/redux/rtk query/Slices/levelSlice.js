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
                body: newLevel
            }),
        }),
        updatePostLevel: builder.mutation({
            query: (updateLevel) => ({
                url: `level/update`,
                method: 'POST',
                body: updateLevel
            })
        }),
    }),
})

export const { useGetAllLevelQuery, usePostLevelMutation, useUpdatePostLevelMutation } = levelApi