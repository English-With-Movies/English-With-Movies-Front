import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const blogApi = createApi({
    reducerPath: 'blogApi',
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
        getAllBlogs: builder.query({
            query: () => `blog/getall`,
        }),
        getByIdBlog: builder.query({
            query: (id) => `blog/getbyid/${id}`,
        }),
        getByCommentsOfBlog: builder.query({
            query: (id) => `blog/getcomments/${id}`,
        }),
        deleteBlog: builder.mutation({
            query: (id) => ({
                url: `blog/delete/${id}`,
                method: 'DELETE'
            })
        }),
        postBlog: builder.mutation({
            query: (newBlog) => ({
                url: `blog/create`,
                method: 'POST',
                body: newBlog
            }),
        }),
        updateBlog: builder.mutation({
            query: (updateBlog) => ({
                url: `blog/update`,
                method: 'PUT',
                body: updateBlog
            }),
        }),
        approveBlog: builder.mutation({
            query: (id) => ({
                url: `blog/approve/${id}`,
                method: 'PUT',
            }),
        }),
        unApproveBlog: builder.mutation({
            query: (id) => ({
                url: `blog/unapprove/${id}`,
                method: 'PUT',
            }),
        }),
    }),
})

export const { useGetAllBlogsQuery, useGetByIdBlogQuery, useDeleteBlogMutation, usePostBlogMutation, useUpdateBlogMutation, useApproveBlogMutation, useUnApproveBlogMutation } = blogApi