import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://ravanguliyeff-001-site1.ntempurl.com/api/' }),
    endpoints: (builder) => ({
        getByNameUser: builder.query({
            query: (userName) => `user/getbyusername/${userName}`,
        }),
        getByIdUser: builder.query({
            query: (id) => `user/getbyid/${id}`,
        }),
        getFavoriteMoviesUser: builder.query({
            query: (userId) => `user/getfavoritemovies?userId=${userId}`,
        }),
        addToFavoritesUser: builder.mutation({
            query: ({ userId, movieId }) => ({
                url: `user/addtofavorites?userId=${userId}&movieId=${movieId}`,
                method: 'POST'
            }),
        }),
        deleteFromFavoritesUser: builder.mutation({
            query: ({ userId, movieId }) => ({
                url: `user/removefromfavorites?userId=${userId}&movieId=${movieId}`,
                method: 'DELETE'
            })
        }),
    }),
})

export const { useGetByIdUserQuery, useGetByNameUserQuery, useGetFavoriteMoviesUserQuery, useAddToFavoritesUserMutation, useDeleteFromFavoritesUserMutation } = userApi