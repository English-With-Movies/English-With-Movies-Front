import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const commentApi = createApi({
    reducerPath: 'commentApi',
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
        getAllComments: builder.query({
            query: () => `comment/getall`,
        }),
        getByIdComment: builder.query({
            query: (id) => `comment/getbyid/${id}`,
        }),
        deleteComment: builder.mutation({
            query: (id) => ({
                url: `comment/delete/${id}`,
                method: 'DELETE'
            })
        }),
        postComment: builder.mutation({
            query: (newComment) => ({
                url: `comment/create`,
                method: 'POST',
                body: newComment
            }),
        }),
        updateComment: builder.mutation({
            query: (updateComment) => ({
                url: `comment/update`,
                method: 'PUT',
                body: updateComment
            }),
        }),
    }),
})

export const { useGetAllCommentsQuery, useGetByIdCommentQuery, usePostCommentMutation, useDeleteCommentMutation, useUpdateCommentMutation } = commentApi