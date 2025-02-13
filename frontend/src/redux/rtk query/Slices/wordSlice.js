import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const wordApi = createApi({
    reducerPath: 'wordApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://ravanguliyeff-001-site1.ntempurl.com/api/' }),
    endpoints: (builder) => ({
        getAllWords: builder.query({
            query: () => `word/getall`,
        }),
        getByIdWord: builder.query({
            query: (id) => `word/getbyid/${id}`,
        }),
        deleteWord: builder.mutation({
            query: (id) => ({
                url: `word/delete/${id}`,
                method: 'DELETE'
            })
        }),
        postWord: builder.mutation({
            query: (newWord) => ({
                url: `word/create`,
                method: 'POST',
                body: newWord
            })
        }),
        updatePostWord: builder.mutation({
            query: (updateWord) => ({
                url: `word/update`,
                method: 'POST',
                body: updateWord
            })
        }),
    }),
})

export const { useGetAllWordsQuery, useGetByIdWordQuery, useDeleteWordMutation, usePostWordMutation, useUpdatePostWordMutation } = wordApi