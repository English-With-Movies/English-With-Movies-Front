import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const settingsApi = createApi({
    reducerPath: 'settingsApi',
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
        getAllSettings: builder.query({
            query: () => `settings/getall`,
        }),
        getSettingsById: builder.query({
            query: (id) => `settings/getbyid/${id}`,
        }),
        getSettingsByKey: builder.query({
            query: (key) => `settings/getbykey/${key}`,
        }),
        deleteSetting: builder.mutation({
            query: (id) => ({
                url: `settings/delete/${id}`,
                method: 'DELETE'
            })
        }),
        postSetting: builder.mutation({
            query: (newSetting) => ({
                url: `settings/create`,
                method: 'POST',
                body: newSetting
            }),
        }),
        updatePostSetting: builder.mutation({
            query: (updateSetting) => ({
                url: `settings/update`,
                method: 'PUT',
                body: updateSetting
            }),
        }),
    })
})

export const { useGetAllSettingsQuery, useGetSettingsByIdQuery, useGetSettingsByKeyQuery, useDeleteSettingMutation, usePostSettingMutation, useUpdatePostSettingMutation } = settingsApi
