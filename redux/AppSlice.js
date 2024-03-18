import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    slides: {},
    slidesInfo: [],
    currentSlide: null,
    isTOCVisible: false,
}

const AppSlice = createSlice({
    name:'App',
    initialState,
    reducers: {
        setSlide(state, action) {
            state.slides[action.payload.slug.current] = action.payload
        },
        setSlidesInfo(state, action) {
            state.slidesInfo = action.payload
        },
        setCurrentSlide(state, action) {
            state.currentSlide = action.payload
        },
        setIsTocVisible(state, action) {
            state.isTOCVisible = action.payload
        }
    }
})

export default AppSlice

