import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const avatarApi = createApi({
    reducerPath: 'avatarApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://ravanguliyeff-001-site1.ntempurl.com/api/' }),
    endpoints: (builder) => ({
        getAllAvatar: builder.query({
            query: () => `avatar/getall`,
        }),
        getByIdAvatar: builder.query({
            query: (id) => `avatar/getbyid/${id}`,
        }),
        deleteAvatar: builder.mutation({
            query: (id) => ({
                url: `avatar/delete/${id}`,
                method: 'DELETE'
            }),
        }),
        postAvatar: builder.mutation({
            query: (newAvatar) => ({
                url: `avatar/create`,
                method: 'POST',
                body: newAvatar,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }),
        }),
        updatePost: builder.mutation({
            query(data) {
                const { id, ...body } = data
                return {
                    url: `categories/${id}`,
                    method: 'PUT',
                    body,
                }
            },
            invalidatesTags: (result, error, { id }) => [{ type: 'Posts', id }],
        }),
    }),
})

export const { useGetAllAvatarQuery, useGetByIdAvatarQuery, useDeleteAvatarMutation, usePostAvatarMutation, useUpdatePostMutation } = avatarApi