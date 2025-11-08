import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const feedbackApi = createApi({
    reducerPath: 'feedbackApi',
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
        getByIdFeedback: builder.query({
            query: (id) => `feedback/getbyid/${id}`,
        }),
        getAllFeedbacks: builder.query({
            query: () => `feedback/getall`,
        }),
        deleteFeedback: builder.mutation({
            query: (id) => ({
                url: `feedback/delete/${id}`,
                method: 'DELETE'
            })
        }),
        postFeedback: builder.mutation({
            query: (newFeedback) => ({
                url: `feedback/create`,
                method: 'POST',
                body: newFeedback
            }),
        }),
        updateReadFeedback: builder.mutation({
            query: (id) => ({
                url: `feedback/read/${id}`,
                method: 'PUT'
            }),
        }),
    }),
})

export const { useGetAllFeedbacksQuery, useGetByIdFeedbackQuery, useDeleteFeedbackMutation, usePostFeedbackMutation, useUpdateReadFeedbackMutation } = feedbackApi