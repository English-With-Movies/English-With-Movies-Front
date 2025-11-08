import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const userReportApi = createApi({
    reducerPath: 'userReportApi',
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
        getAllReport: builder.query({
            query: () => `userreport/getall`,
        }),
        getByIdReport: builder.query({
            query: (id) => `userreport/getbyid/${id}`,
        }),
        deleteReport: builder.mutation({
            query: (id) => ({
                url: `userreport/delete/${id}`,
                method: 'DELETE'
            })
        }),
        postReport: builder.mutation({
            query: (newReport) => ({
                url: `userreport/create`,
                method: 'POST',
                body: newReport
            }),
        }),
        updateReadReport: builder.mutation({
            query: (id) => ({
                url: `userreport/read/${id}`,
                method: 'PUT'
            }),
        }),
    }),
})

export const { useGetAllReportQuery, useGetByIdReportQuery, useDeleteReportMutation, usePostReportMutation, useUpdateReadReportMutation } = userReportApi
