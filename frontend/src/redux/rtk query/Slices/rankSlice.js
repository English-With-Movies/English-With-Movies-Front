import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const rankApi = createApi({
    reducerPath: 'rankApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://ravanguliyeff-001-site1.ntempurl.com/api/' }),
    endpoints: (builder) => ({
        getRanksForPoint: builder.query({
            query: (userId) => `rank/getranksforpoint?userId=${userId}`,
        }),
        getRanksForTodaysPoint: builder.query({
            query: (userId) => `rank/getranksfortodayspoint?userId=${userId}`,
        }),
        getRanksForStreak: builder.query({
            query: (userId) => `rank/getranksforstreak?userId=${userId}`,
        }),
    })
})

export const { useGetRanksForPointQuery, useGetRanksForTodaysPointQuery, useGetRanksForStreakQuery } = rankApi