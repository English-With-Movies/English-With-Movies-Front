import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const registerApi = createApi({
    reducerPath: 'registerApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://ravanguliyeff-001-site1.ntempurl.com/api/user/' }),
    endpoints: (builder) => ({
        postRegister: builder.mutation({
            query: (newUser) => ({
                url: `register`,
                method: 'POST',
                body: newUser,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
        }),
        postLogin: builder.mutation({
            query: (userLogin) => ({
                url: `login`,
                method: 'POST',
                body: userLogin,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
        })
    }),
})

export const { usePostLoginMutation, usePostRegisterMutation } = registerApi
