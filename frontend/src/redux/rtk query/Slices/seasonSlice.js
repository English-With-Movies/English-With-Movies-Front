import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const seasonApi = createApi({
    reducerPath: 'seasonApi',
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
        getAllSeason: builder.query({
            query: () => `season/getall`,
        }),
        getByIdSeason: builder.query({
            query: (id) => `season/getbyid/${id}`,
        }),
        deleteSeason: builder.mutation({
            query: (id) => ({
                url: `season/delete/${id}`,
                method: 'DELETE'
            })
        }),
        postSeason: builder.mutation({
            query: (newSeason) => ({
                url: `season/create`,
                method: 'POST',
                body: newSeason
            })
        }),
        updatePostSeason: builder.mutation({
            query: (updateSeason) => ({
                url: `season/update`,
                method: 'POST',
                body: updateSeason
            })
        }),
    }),
})

export const { useGetAllSeasonQuery, useGetByIdSeasonQuery, useDeleteSeasonMutation, usePostSeasonMutation, useUpdatePostSeasonMutation } = seasonApi