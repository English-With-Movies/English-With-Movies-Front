import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const rankApi = createApi({
    reducerPath: 'rankApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://ravanguliyeff-001-site1.ntempurl.com/api/' }),
    endpoints: (builder) => ({
        getRanksForPoint: builder.query({
            query: () => `rank/getranksforpoint`,
        }),
        getRanksForTodaysPoint: builder.query({
            query: () => `rank/getranksfortodayspoint`,
        }),
        getRanksForStreak: builder.query({
            query: () => `rank/getranksforstreak`,
        }),
    }),
})

export const { useGetRanksForPointQuery, useGetRanksForTodaysPointQuery, useGetRanksForStreakQuery } = rankApi