import { createSlice } from "@reduxjs/toolkit";
const initialState={theme:"light"}
const themeSlice=createSlice({
    name:"Theme",
    initialState:initialState,
    reducers:{
        toggleTheme(state){
            state.theme = state.theme === "light" ? "dark" : "light";
        }
    }
})
export const themeActions=themeSlice.actions
export default themeSlice.reducer
