import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const userNotificationApi = createApi({
    reducerPath: 'userNotificationApi',
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
        getByIdNotification: builder.query({
            query: (id) => `usernotification/getbyid/${id}`,
        }),
        getByIdUserNotifications: builder.query({
            query: (userId) => `usernotification/getusersnotification/${userId}`,
        }),
        deleteNotification: builder.mutation({
            query: (id) => ({
                url: `usernotification/delete/${id}`,
                method: 'DELETE'
            })
        }),
        postNotification: builder.mutation({
            query: (newNotification) => ({
                url: `usernotification/create`,
                method: 'POST',
                body: newNotification
            }),
        }),
        updateReadNotification: builder.mutation({
            query: (id) => ({
                url: `usernotification/read/${id}`,
                method: 'PUT'
            }),
        }),
    }),
})

export const { useGetByIdNotificationQuery, useGetByIdUserNotificationsQuery, useDeleteNotificationMutation, usePostNotificationMutation, useUpdateReadNotificationMutation } = userNotificationApi