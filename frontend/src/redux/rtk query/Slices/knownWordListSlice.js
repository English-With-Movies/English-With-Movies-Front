import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const knownWordListApi = createApi({
    reducerPath: 'knownWordListApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://ravanguliyeff-001-site1.ntempurl.com/api/' }),
    endpoints: (builder) => ({
        getKnownWordListById: builder.query({
            query: (id) => `knownwordlist/getbyid/${id}`,
        }),
        deleteWordFromKnownWordList: builder.mutation({
            query: ({ knownWordListId, wordId }) => ({
                url: `knownwordlist/${knownWordListId}/removeword/${wordId}`,
                method: 'DELETE'
            })
        }),
        postWordToKnownWordList: builder.mutation({
            query: ({ knownWordListId, wordId }) => ({
                url: `knownwordlist//${knownWordListId}/addword/${wordId}`,
                method: 'POST'
            })
        }),
    }),
})

export const { useDeleteWordFromKnownWordListMutation, usePostWordToKnownWordListMutation, useGetKnownWordListByIdQuery } = knownWordListApi
