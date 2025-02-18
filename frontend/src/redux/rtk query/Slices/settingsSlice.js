import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const settingsApi = createApi({
    reducerPath: 'settingsApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://ravanguliyeff-001-site1.ntempurl.com/api/' }),
    endpoints: (builder) => ({
        getAllSettings: builder.query({
            query: () => `settings/getall`,
        }),
        getSettingsById: builder.query({
            query: (id) => `settings/getbyid/${id}`,
        }),
        getSettingsByKey: builder.query({
            query: (key) => `settings/getbykey/${key}`,
        })
        // post put delete
    })
})

export const { useGetAllSettingsQuery, useGetSettingsByIdQuery, useGetSettingsByKeyQuery } = settingsApi
