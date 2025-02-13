import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const customWordListApi = createApi({
    reducerPath: 'customWordListApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://ravanguliyeff-001-site1.ntempurl.com/api/' }),
    endpoints: (builder) => ({
        getAllCustomWordList: builder.query({
            query: () => `customwordlist/getall`,
        }),
        getByIdCustomWordList: builder.query({
            query: (id) => `customwordlist/getbyid/${id}`,
        }),
        deleteCustomWordList: builder.mutation({
            query: (id) => ({
                url: `customwordlist/delete/${id}`,
                method: 'DELETE'
            })
        }),
        postCustomWordList: builder.mutation({
            query: (newCustomWordList) => ({
                url: `customwordlist/create`,
                method: 'POST',
                body: newCustomWordList
            })
        }),
        updatePostCustomWordList: builder.mutation({
            query: (updateCustomWordList) => ({
                url: `customwordlist/update`,
                method: 'POST',
                body: updateCustomWordList
            })
        }),
        deleteWordFromCustomWordList: builder.mutation({
            query: ({ customWordListId, wordId }) => ({
                url: `customwordlist/${customWordListId}/removeword/${wordId}`,
                method: 'DELETE'
            })
        }),
        postWordFromCustomWordList: builder.mutation({
            query: ({ customWordListId, wordId }) => ({
                url: `customwordlist//${customWordListId}/addword/${wordId}`,
                method: 'POST'
            })
        }),
    }),
})

export const { useGetAllCustomWordListQuery, useGetByIdCustomWordListQuery, useDeleteCustomWordListMutation, useDeleteWordFromCustomWordListMutation, usePostCustomWordListMutation, usePostWordFromCustomWordListMutation, useUpdatePostCustomWordListMutation } = customWordListApi