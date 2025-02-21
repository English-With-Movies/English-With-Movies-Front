import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const subscriptionApi = createApi({
    reducerPath: 'subscriptionApi',
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
        getAllSubscription: builder.query({
            query: () => `subscription/getall`,
        }),
        postSubscription: builder.mutation({
            query: (newSubscription) => ({
                url: `subscription/create`,
                method: 'POST',
                body: newSubscription
            })
        }),
        updatePostSubscription: builder.mutation({
            query: (updateSubscription) => ({
                url: `subscription/update`,
                method: 'POST',
                body: updateSubscription
            })
        }),
    }),
})

export const { useGetAllSubscriptionQuery, usePostSubscriptionMutation, useUpdatePostSubscriptionMutation } = subscriptionApi