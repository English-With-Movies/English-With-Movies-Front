import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const episodeApi = createApi({
    reducerPath: 'episodeApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://ravanguliyeff-001-site1.ntempurl.com/api/' }),
    endpoints: (builder) => ({
        getAllEpisode: builder.query({
            query: () => `episode/getall`,
        }),
        getByIdEpisode: builder.query({
            query: (id) => `episode/getbyid/${id}`,
        }),
        deleteEpisode: builder.mutation({
            query: (id) => ({
                url: `episode/delete/${id}`,
                method: 'DELETE'
            })
        }),
        postEpisode: builder.mutation({
            query: (newEpisode) => ({
                url: `episode/create`,
                method: 'POST',
                body: newEpisode
            })
        }),
        updatePostEpisode: builder.mutation({
            query: (updateEpisode) => ({
                url: `episode/update`,
                method: 'POST',
                body: updateEpisode
            })
        }),
        deleteWordFromEpisode: builder.mutation({
            query: ({ episodeId, wordId }) => ({
                url: `episode/${episodeId}/removeword/${wordId}`,
                method: 'DELETE'
            })
        }),
        postWordFromEpisode: builder.mutation({
            query: ({ episodeId, wordId }) => ({
                url: `episode//${episodeId}/addword/${wordId}`,
                method: 'POST'
            })
        }),
    }),
})

export const { useGetAllEpisodeQuery, useGetByIdEpisodeQuery, useDeleteEpisodeMutation, useDeleteWordFromEpisodeMutation, usePostEpisodeMutation, usePostWordFromEpisodeMutation, useUpdatePostEpisodeMutation } = episodeApi
