import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { HomePageSetter } from '@/pages/user/settings/HomePageSetter'

const initialState: {
  isLogin: boolean
  meta: {
    token: string
  } | null
  helloPage: HomePageSetter
} = {
  isLogin: false,
  meta: null,
  helloPage: HomePageSetter.hole,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.isLogin = true
      state.meta = {
        token: action.payload,
      }
    },
    logout: (state) => {
      state.isLogin = false
    },
    setHelloPage: (state, action: PayloadAction<HomePageSetter>) => {
      state.helloPage = action.payload
    },
  },
})

export const { login, logout, setHelloPage } = userSlice.actions

export const UserReducer = userSlice.reducer
