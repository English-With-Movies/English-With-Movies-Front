import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const userApi = createApi({
    reducerPath: 'userApi',
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
        getAllUser: builder.query({
            query: () => `user/getall`,
        }),
        getByNameUser: builder.query({
            query: (userName) => `user/getbyusername/${userName}`,
        }),
        getByIdUser: builder.query({
            query: (id) => `user/getbyid/${id}`,
        }),
        getFavoriteMoviesUser: builder.query({
            query: (userId) => `user/getfavoritemovies?userId=${userId}`,
        }),
        getFavoriteBlogsUser: builder.query({
            query: (userId) => `user/getfavoriteblogs?userId=${userId}`,
        }),
        getResetCodeCheck: builder.query({
            query: ({ email, code }) => `user/resetcodecheck?email=${email}&code=${code}`,
        }),
        addToFavoritesUser: builder.mutation({
            query: ({ userId, movieId }) => ({
                url: `user/addtofavorites?userId=${userId}&movieId=${movieId}`,
                method: 'POST'
            }),
        }),
        deleteFromFavoritesUser: builder.mutation({
            query: ({ userId, movieId }) => ({
                url: `user/removefromfavorites?userId=${userId}&movieId=${movieId}`,
                method: 'DELETE'
            })
        }),
        addToFavoriteBlogUser: builder.mutation({
            query: ({ userId, blogId }) => ({
                url: `user/addtofavorites?userId=${userId}&blogId=${blogId}`,
                method: 'POST'
            }),
        }),
        deleteFromFavoriteBlogUser: builder.mutation({
            query: ({ userId, blogId }) => ({
                url: `user/removefromfavorites?userId=${userId}&blogId=${blogId}`,
                method: 'DELETE'
            })
        }),
        addPointToUser: builder.mutation({
            query: ({ userId, amount }) => ({
                url: `user/addpointtouser?userId=${userId}&amount=${amount}`,
                method: 'POST'
            }),
        }),
        userBuyFrame: builder.mutation({
            query: ({ userId, frameId }) => ({
                url: `user/getframe?userId=${userId}&frameId=${frameId}`,
                method: 'POST'
            }),
        }),
        userUpdateCurrentFrame: builder.mutation({
            query: ({ userId, frameId }) => ({
                url: `user/updatecurrentframe?userId=${userId}&frameId=${frameId}`,
                method: 'PUT'
            }),
        }),
        userUpdateProfile: builder.mutation({
            query: (updateUser) => ({
                url: `user/updateprofile`,
                method: 'PUT',
                body: updateUser
            }),
        }),
        userUpdatePassword: builder.mutation({
            query: ({ userId, oldPassword, newPassword, confirmPassword }) => ({
                url: `user/updatepassword?userId=${userId}&oldPassword=${oldPassword}&newPassword=${newPassword}&confirmPassword=${confirmPassword}`,
                method: 'PUT'
            }),
        }),
        userUpdateAvatar: builder.mutation({
            query: ({ userId, formData }) => ({
                url: `user/updateavatar?userId=${userId}`,
                method: 'PUT',
                body: formData,
            }),
        }),
        userUpdateAvatarById: builder.mutation({
            query: ({ userId, avatarId }) => ({
                url: `user/updateavatar?userId=${userId}&avatarId=${avatarId}`,
                method: 'PUT',
            }),
        }),
        deleteUser: builder.mutation({
            query: (userId) => ({
                url: `user/deleteuser?userId=${userId}`,
                method: 'DELETE'
            })
        }),
        changeUserRole: builder.mutation({
            query: ({ userId, role }) => ({
                url: `user/changeuserrole?userId=${userId}&role=${role}`,
                method: 'PUT'
            }),
        }),
        lockOutUser: builder.mutation({
            query: ({ userId, durationInMinutes }) => ({
                url: `user/lockoutuser?userId=${userId}&durationInMinutes=${durationInMinutes}`,
                method: 'PUT'
            }),
        }),
        unLockUser: builder.mutation({
            query: (userId) => ({
                url: `user/unlockuser?userId=${userId}`,
                method: 'PUT'
            }),
        }),
    }),
})

export const {
    useGetByIdUserQuery,
    useGetByNameUserQuery,
    useGetFavoriteMoviesUserQuery,
    useAddToFavoritesUserMutation,
    useDeleteFromFavoritesUserMutation,
    useAddPointToUserMutation,
    useGetAllUserQuery,
    useGetResetCodeCheckQuery,
    useUserBuyFrameMutation,
    useUserUpdateCurrentFrameMutation,
    useAddToFavoriteBlogUserMutation,
    useDeleteFromFavoriteBlogUserMutation,
    useGetFavoriteBlogsUserQuery,
    useUserUpdateProfileMutation,
    useUserUpdateAvatarMutation,
    useUserUpdateAvatarByIdMutation,
    useDeleteUserMutation,
    useChangeUserRoleMutation,
    useUserUpdatePasswordMutation,
    useLockOutUserMutation,
    useUnLockUserMutation } = userApi