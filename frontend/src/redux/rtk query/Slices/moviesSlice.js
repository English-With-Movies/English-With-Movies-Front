import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const moviesApi = createApi({
    reducerPath: 'moviesApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://ravanguliyeff-001-site1.ntempurl.com/api/' }),
    endpoints: (builder) => ({
        getAllMovies: builder.query({
            query: () => `movie/getall`,
        }),
        getForHomePageMovies: builder.query({
            query: () => `movie/getforhomepage`,
        }),
        getByIdMovie: builder.query({
            query: (id) => `movie/getbyid/${id}`,
        }),
        getByNameMovie: builder.query({
            query: (id) => `movie/getbyname/${id}`,
        }),
        deleteMovie: builder.mutation({
            query: (id) => ({
                url: `movie/delete/${id}`,
                method: 'DELETE'
            })
        }),
        postMovie: builder.mutation({
            query: (newMovie) => ({
                url: `movie/create`,
                method: 'POST',
                body: newMovie,
            }),
        }),
        updatePostMovie: builder.mutation({
            query: (updateMovie) => ({
                url: `movie/update`,
                method: 'POST',
                body: updateMovie
            })
        }),
    }),
})

export const { useGetAllMoviesQuery, useGetForHomePageMoviesQuery, useGetByIdMovieQuery, useGetByNameMovieQuery, useDeleteMovieMutation, usePostMovieMutation, useUpdatePostMovieMutation } = moviesApi