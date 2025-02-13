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
    )

})

setupListeners(store.dispatch)