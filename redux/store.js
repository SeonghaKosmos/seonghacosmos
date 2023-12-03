import {configureStore } from '@reduxjs/toolkit'
import appSlice from './AppSlice'




let store = configureStore({
    reducer: {
        app: appSlice.reducer
    } 
})


export const appSliceActions = appSlice.actions
export default store