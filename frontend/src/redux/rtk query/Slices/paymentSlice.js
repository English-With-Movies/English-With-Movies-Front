import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const paymentApi = createApi({
    reducerPath: 'paymentApi',
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
        buySubscription: builder.mutation({
            query: ({ email, token, subscriptionId }) => ({
                url: `payment/buysubscription?email=${email}&token=${token}&subscriptionId=${subscriptionId}`,
                method: 'POST'
            }),
        }),
    }),
})

export const { useBuySubscriptionMutation } = paymentApi
