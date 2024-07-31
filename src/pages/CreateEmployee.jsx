import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Modal from "react-modal";
import { departments } from "../data/departments";
import { states } from "../data/state";
import DropDown from "react-dropdown-plugin";
import { Link } from "react-router-dom";
import "../css/createEmployee.css";
import { useDispatch } from "react-redux";
import { addEmployee } from "../reducer/employeeSlice";
import "../css/dropDown.css";

Modal.setAppElement("#root");

const CreateEmployee = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [selectedDepartment, setSelectedDepartment] = useState(null);
    const [selectedState, setSelectedState] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const dispatch = useDispatch();

    const saveEmployee = () => {
        const newEmployee = {
            firstName,
            lastName,
            dateOfBirth: dateOfBirth ? dateOfBirth.toISOString() : null,
            startDate: startDate ? startDate.toISOString() : null,
            street,
            city,
            zipCode,
            department: selectedDepartment,
            state: selectedState,
        };
        dispatch(addEmployee(newEmployee));
        setModalIsOpen(true);
    };

    const handleDepartmentSelect = (department) => {
        setSelectedDepartment(department);
    };

    const handleStateSelect = (state) => {
        setSelectedState(state);
    };

    return (
        <>
            <div className="container">
                <h2>Create Employee</h2>
                <Link to="/employees">Current Employees</Link>
                <form>
                    <label htmlFor="first-name">First Name</label>
                    <input
                        type="text"
                        id="first-name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />

                    <label htmlFor="last-name">Last Name</label>
                    <input
                        type="text"
                        id="last-name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />

                    <label htmlFor="date-of-birth">Date of Birth</label>
                    <DatePicker
                        selected={dateOfBirth}
                        onChange={(date) => setDateOfBirth(date)}
                        dateFormat="MM/dd/yyyy"
                    />

                    <label htmlFor="start-date">Start Date</label>
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        dateFormat="MM/dd/yyyy"
                    />

                    <fieldset className="address">
                        <legend>Address</legend>

                        <label htmlFor="street">Street</label>
                        <input
                            id="street"
                            type="text"
                            value={street}
                            onChange={(e) => setStreet(e.target.value)}
                        />

                        <label htmlFor="city">City</label>
                        <input
                            id="city"
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />

                        <label htmlFor="zip-code">Zip Code</label>
                        <input
                            id="zip-code"
                            type="number"
                            value={zipCode}
                            onChange={(e) => setZipCode(e.target.value)}
                        />
                    </fieldset>

                    <label htmlFor="department">Department</label>
                    <DropDown
                        id="department"
                        data={departments}
                        onSelect={handleDepartmentSelect}
                        ASC={true}
                        initialOption={selectedDepartment}
                    />

                    <label htmlFor="state">State</label>
                    <DropDown
                        id="state"
                        data={states}
                        onSelect={handleStateSelect}
                        ASC={true}
                        initialOption={selectedState}
                    />
                </form>

                <div className="btnDiv">
                    <button onClick={saveEmployee}>Save</button>
                </div>

                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={() => setModalIsOpen(false)}
                    contentLabel="Employee Created"
                >
                    <div>Employee Created!</div>
                    <button onClick={() => setModalIsOpen(false)}>Close</button>
                </Modal>
            </div>
        </>
    );
};

export default CreateEmployee;
