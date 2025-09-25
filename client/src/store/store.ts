import { configureStore } from "@reduxjs/toolkit";
import students_slice from "./slices/studentSlice"
const store = configureStore({
    reducer:{
        students:students_slice
    }
})
export default store