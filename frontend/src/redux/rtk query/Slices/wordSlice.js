import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const wordApi = createApi({
    reducerPath: 'wordApi',
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
        getAllWords: builder.query({
            query: ({ pageNumber, pageSize }) => `word/getall?pageNumber=${pageNumber}&pageSize=${pageSize}`,
        }),
        getByIdWord: builder.query({
            query: (id) => `word/getbyid/${id}`,
        }),
        getByWordText: builder.query({
            query: (wordText) => `word/getbywordtext/${wordText}`,
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
                method: 'PUT',
                body: updateWord
            })
        }),

    }),
})

export const { useGetAllWordsQuery, useGetByIdWordQuery, useGetByWordTextQuery, useDeleteWordMutation, usePostWordMutation, useUpdatePostWordMutation } = wordApi