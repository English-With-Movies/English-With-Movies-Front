import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const avatarApi = createApi({
    reducerPath: 'avatarApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://ravanguliyeff-001-site1.ntempurl.com/api/' }),
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
                method: 'POST',
                body: updateAvatar
            }),
        }),
    }),
})

export const { useGetAllAvatarQuery, useGetByIdAvatarQuery, useDeleteAvatarMutation, usePostAvatarMutation, useUpdatePostAvatarMutation } = avatarApi