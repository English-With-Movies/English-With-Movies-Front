import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const knownWordListApi = createApi({
    reducerPath: 'knownWordListApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://ravanguliyeff-001-site1.ntempurl.com/api/' }),
    endpoints: (builder) => ({
        deleteWordFromKnownWordList: builder.mutation({
            query: ({ knownWordListId, wordId }) => ({
                url: `knownwordlist/${knownWordListId}/removeword/${wordId}`,
                method: 'DELETE'
            })
        }),
        postWordFromKnownWordList: builder.mutation({
            query: ({ knownWordListId, wordId }) => ({
                url: `knownwordlist//${knownWordListId}/addword/${wordId}`,
                method: 'POST'
            })
        }),
    }),
})

export const { useDeleteWordFromKnownWordListMutation, usePostWordFromKnownWordListMutation } = knownWordListApi
