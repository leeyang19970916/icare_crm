import {configureStore } from "@reduxjs/toolkit";
// import { Value } from "sass";
import log_writingSlice from "./log-writing-slice"
import appSlice from "./app-slice"
import filterSlice from "./filter-slice";
import modalSlice from "./modal-slice";
import scrollTopSlice from "./scrollTop-slice";
const store=configureStore({
    reducer:{
        log_writingSlice:log_writingSlice,
        appSlice: appSlice,
        filterSlice:filterSlice,
        modalSlice:modalSlice,
        scrollTopSlice:scrollTopSlice
    }
})

export default store