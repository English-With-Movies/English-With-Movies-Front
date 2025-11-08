import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { registerApi } from './Slices/registerSlice'
import { avatarApi } from './Slices/avatarSlice'
import { levelApi } from './Slices/levelSlice'
import { moviesApi } from './Slices/moviesSlice'
import { genreApi } from './Slices/genreSlice'
import { frameApi } from './Slices/frameSlice'
import { rankApi } from './Slices/rankSlice'
import { wordApi } from './Slices/wordSlice'
import { subscriptionApi } from './Slices/subscription'
import { seasonApi } from './Slices/seasonSlice'
import { episodeApi } from './Slices/episodeSlice'
import { customWordListApi } from './Slices/customWordListSlice'
import { knownWordListApi } from './Slices/knownWordListSlice'
import { userApi } from './Slices/userSlice'
import { settingsApi } from './Slices/settingsSlice'
import { blogApi } from './Slices/blogSlice'
import { commentApi } from './Slices/commentSlice'
import { aiApi } from './Slices/aiSlice'
import { paymentApi } from './Slices/paymentSlice'
import { userReportApi } from './Slices/userReportSlice'
import { userNotificationApi } from './Slices/userNotificationSlice'
import { feedbackApi } from './Slices/feedbackSlice'

export const store = configureStore({
  reducer: {
    [avatarApi.reducerPath]: avatarApi.reducer,
    [registerApi.reducerPath]: registerApi.reducer,
    [levelApi.reducerPath]: levelApi.reducer,
    [moviesApi.reducerPath]: moviesApi.reducer,
    [genreApi.reducerPath]: genreApi.reducer,
    [frameApi.reducerPath]: frameApi.reducer,
    [rankApi.reducerPath]: rankApi.reducer,
    [wordApi.reducerPath]: wordApi.reducer,
    [subscriptionApi.reducerPath]: subscriptionApi.reducer,
    [seasonApi.reducerPath]: seasonApi.reducer,
    [episodeApi.reducerPath]: episodeApi.reducer,
    [customWordListApi.reducerPath]: customWordListApi.reducer,
    [knownWordListApi.reducerPath]: knownWordListApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [settingsApi.reducerPath]: settingsApi.reducer,
    [blogApi.reducerPath]: blogApi.reducer,
    [commentApi.reducerPath]: commentApi.reducer,
    [aiApi.reducerPath]: aiApi.reducer,
    [paymentApi.reducerPath]: paymentApi.reducer,
    [userReportApi.reducerPath]: userReportApi.reducer,
    [userNotificationApi.reducerPath]: userNotificationApi.reducer,
    [feedbackApi.reducerPath]: feedbackApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      avatarApi.middleware,
      registerApi.middleware,
      levelApi.middleware,
      moviesApi.middleware,
      genreApi.middleware,
      frameApi.middleware,
      rankApi.middleware,
      wordApi.middleware,
      subscriptionApi.middleware,
      seasonApi.middleware,
      episodeApi.middleware,
      customWordListApi.middleware,
      knownWordListApi.middleware,
      userApi.middleware,
      settingsApi.middleware,
      blogApi.middleware,
      commentApi.middleware,
      aiApi.middleware,
      paymentApi.middleware,
      userReportApi.middleware,
      userNotificationApi.middleware,
      feedbackApi.middleware,
    )

})

setupListeners(store.dispatch)