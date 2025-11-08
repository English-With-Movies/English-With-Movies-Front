import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const levelApi = createApi({
    reducerPath: 'levelApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://ravanguliyeff-001-site1.ntempurl.com/api/',
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("accessToken");
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
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
                method: 'PUT',
                body: updateLevel
            })
        }),
    }),
})

export const { useGetAllLevelQuery, usePostLevelMutation, useUpdatePostLevelMutation } = levelApi