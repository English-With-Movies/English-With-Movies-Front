import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const userApi = createApi({
    reducerPath: 'userApi',
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
        getAllUser: builder.query({
            query: () => `user/getall`,
        }),
        getByNameUser: builder.query({
            query: (userName) => `user/getbyusername/${userName}`,
        }),
        getByIdUser: builder.query({
            query: (id) => `user/getbyid/${id}`,
        }),
        getFavoriteMoviesUser: builder.query({
            query: (userId) => `user/getfavoritemovies?userId=${userId}`,
        }),
        getResetCodeCheck: builder.query({
            query: ({ userId, movieId }) => `user/resetcodecheck?userId=${userId}&movieId=${movieId}`,
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
        addPointToUser: builder.mutation({
            query: ({ userId, amount }) => ({
                url: `user/addpointtouser?userId=${userId}&amount=${amount}`,
                method: 'POST'
            }),
        }),
        // postRefreshTokenUser: builder.mutation({
        //     query: (refreshToken) => ({
        //         url: `user/refreshtoken?refreshToken=${refreshToken}`,
        //         method: 'POST'
        //     }),
        // }),
    }),
})

export const { useGetByIdUserQuery, useGetByNameUserQuery, useGetFavoriteMoviesUserQuery, useAddToFavoritesUserMutation, useDeleteFromFavoritesUserMutation, useAddPointToUserMutation, useGetAllUserQuery } = userApi