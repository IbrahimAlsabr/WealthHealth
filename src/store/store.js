import { configureStore } from "@reduxjs/toolkit";
import employeeReducer from "../reducer/employeeSlice";

export const store = configureStore({
    reducer: {
        employees: employeeReducer,
    },
});

export default store;
