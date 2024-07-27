import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    employees: JSON.parse(localStorage.getItem("employees")) || [],
};

const employeeSlice = createSlice({
    name: "employees",
    initialState, 
    reducers: {
        addEmployee: (state, action) => {
            state.employees.push(action.payload);
            localStorage.setItem("employees", JSON.stringify(state.employees));
        },
        setEmployees: (state, action) => {
            state.employees = action.payload;
            localStorage.setItem("employees", JSON.stringify(state.employees));
        },
    },
});

export const { addEmployee, setEmployees } = employeeSlice.actions;

export default employeeSlice.reducer;
