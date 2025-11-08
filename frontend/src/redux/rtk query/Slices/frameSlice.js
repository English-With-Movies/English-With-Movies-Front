import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const frameApi = createApi({
    reducerPath: 'frameApi',
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
        getAllFrame: builder.query({
            query: () => `frame/getall`,
        }),
        getByIdFrame: builder.query({
            query: (id) => `frame/getbyid/${id}`,
        }),
        deleteFrame: builder.mutation({
            query: (id) => ({
                url: `frame/delete/${id}`,
                method: 'DELETE'
            })
        }),
        postFrame: builder.mutation({
            query: (newFrame) => ({
                url: `frame/create`,
                method: 'POST',
                body: newFrame
            }),
        }),
        updatePostFrame: builder.mutation({
            query: (updateFrame) => ({
                url: `frame/update`,
                method: 'PUT',
                body: updateFrame
            }),
        }),
    }),
})

export const { useGetAllFrameQuery, useGetByIdFrameQuery, useDeleteFrameMutation, usePostFrameMutation, useUpdatePostFrameMutation } = frameApi