import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CreateEmployee from "../pages/CreateEmployee";
import EmployeeList from "../pages/EmployeeList";
import employeeData from "../data/employeeData";

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<CreateEmployee />} />
                <Route
                    path="/employees"
                    element={<EmployeeList data={employeeData} />}
                />
            </Routes>
        </Router>
    );
};

export default AppRouter;
