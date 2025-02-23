import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const aiApi = createApi({
    reducerPath: 'aiApi',
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
        generateSentences: builder.mutation({
            query: (word) => ({
                url: `ai/generatesentences?word=${word}`,
                method: 'POST',
            }),
        }),
        generateSpeech: builder.mutation({
            query: (text) => ({
                url: `ai/generatespeech?text=${text}`,
                method: 'POST'
            }),
        }),
    }),
})

export const { useGenerateSentencesMutation, useGenerateSpeechMutation } = aiApi
