import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    currentPage: 1
}

const shopSlice = createSlice({
    name: 'shop',
    initialState,
    reducers: {
        setCurrentPage(state, action) {
            state.currentPage = action.payload
        }
    }
})

export default shopSlice.reducer

export const {setCurrentPage} = shopSlice.actions

export const selectShop = state => state.shop