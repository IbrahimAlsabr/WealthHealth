import { useSelector } from "react-redux";
import { useMemo } from "react";
import { useTable } from "react-table";
import "../css/EmployeeList.css";

const EmployeeList = () => {
    const employees = useSelector((state) => state.employees.employees);

    const data = useMemo(
        () =>
            employees.map((employee) => ({
                ...employee,
                dateOfBirth: new Date(
                    employee.dateOfBirth
                ).toLocaleDateString(),
                startDate: new Date(employee.startDate).toLocaleDateString(),
            })),
        [employees]
    );

    const columns = useMemo(
        () => [
            { Header: "First Name", accessor: "firstName" },
            { Header: "Last Name", accessor: "lastName" },
            { Header: "Date of Birth", accessor: "dateOfBirth" },
            { Header: "Start Date", accessor: "startDate" },
            { Header: "Street", accessor: "street" },
            { Header: "City", accessor: "city" },
            { Header: "State", accessor: "state" },
            { Header: "Zip Code", accessor: "zipCode" },
            { Header: "Department", accessor: "department" },
        ],
        []
    );

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        useTable({ columns, data });

    return (
        <div className="employee-div container">
            <h1>Current Employees</h1>
            <a href="/">Home</a>
            <table {...getTableProps()} className="display">
                <thead>
                    {headerGroups.map((headerGroup, index) => (
                        <tr
                            {...headerGroup.getHeaderGroupProps()}
                            key={`header-group-${index}`}
                        >
                            {headerGroup.headers.map((column, index) => (
                                <th
                                    {...column.getHeaderProps()}
                                    key={`header-${index}`}
                                >
                                    {column.render("Header")}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row, rowIndex) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()} key={`row-${rowIndex}`}>
                                {row.cells.map((cell, cellIndex) => (
                                    <td
                                        {...cell.getCellProps()}
                                        key={`cell-${cellIndex}`}
                                    >
                                        {cell.render("Cell")}
                                    </td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default EmployeeList;
