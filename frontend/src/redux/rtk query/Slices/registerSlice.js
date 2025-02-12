import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const registerApi = createApi({
    reducerPath: 'registerApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://ravanguliyeff-001-site1.ntempurl.com/api/user/' }),
    endpoints: (builder) => ({
        postRegister: builder.mutation({
            query: (newUser) => ({
                url: `register`,
                method: 'POST',
                body: newUser
            })
        }),
        postLogin: builder.mutation({
            query: (userLogin) => ({
                url: `login`,
                method: 'POST',
                body:userLogin
            })
        })
    }),
})

export const { usePostLoginMutation, usePostRegisterMutation } = registerApi
