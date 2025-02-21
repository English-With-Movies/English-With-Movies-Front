import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const avatarApi = createApi({
    reducerPath: 'avatarApi',
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
            })
        }),
        postAvatar: builder.mutation({
            query: (newAvatar) => ({
                url: `avatar/create`,
                method: 'POST',
                body: newAvatar
            }),
        }),
        updatePostAvatar: builder.mutation({
            query: (updateAvatar) => ({
                url: `avatar/update`,
                method: 'PUT',
                body: updateAvatar
            }),
        }),
    }),
})

export const { useGetAllAvatarQuery, useGetByIdAvatarQuery, useDeleteAvatarMutation, usePostAvatarMutation, useUpdatePostAvatarMutation } = avatarApi