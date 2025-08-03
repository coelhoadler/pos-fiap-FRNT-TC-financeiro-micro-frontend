import { configureStore } from "@reduxjs/toolkit";
import userInfoSlice from "../features/slice"

const store = configureStore({
    reducer: {
        userInfo: userInfoSlice
    }
});

export default store;