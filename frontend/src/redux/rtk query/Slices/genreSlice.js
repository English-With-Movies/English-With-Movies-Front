import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const genreApi = createApi({
    reducerPath: 'genreApi',
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
        getAllGenre: builder.query({
            query: () => `genre/getall`,
        }),
        getByIdGenre: builder.query({
            query: (id) => `genre/getbyid/${id}`,
        }),
        deleteGenre: builder.mutation({
            query: (id) => ({
                url: `genre/delete/${id}`,
                method: 'DELETE'
            })
        }),
        postGenre: builder.mutation({
            query: (newAvatar) => ({
                url: `genre/create`,
                method: 'POST',
                body: newAvatar
            }),
        }),
        updatePostGenre: builder.mutation({
            query: (updateGenre) => ({
                url: `genre/update`,
                method: 'POST',
                body: updateGenre
            }),
        }),
    }),
})

export const { useGetAllGenreQuery, useGetByIdGenreQuery, useDeleteGenreMutation, usePostGenreMutation, useUpdatePostGenreMutation } = genreApi