/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { useMemo } from "react";
import {
    useTable,
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination,
} from "react-table";
import "../css/EmployeeList.css";

const GlobalFilter = ({ globalFilter, setGlobalFilter }) => {
    return (
        <span>
            Search:{" "}
            <input
                value={globalFilter || ""}
                onChange={(e) => setGlobalFilter(e.target.value || undefined)}
                placeholder={`Type to search...`}
                style={{
                    fontSize: "1.1rem",
                    border: "0",
                }}
            />
        </span>
    );
};

const EmployeesList = () => {
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

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        state,
        setGlobalFilter,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
    } = useTable(
        { columns, data },
        useFilters,
        useGlobalFilter,
        useSortBy,
        usePagination
    );

    const { globalFilter, pageIndex, pageSize } = state;

    return (
        <div className="employee-div container">
            <h1>Current Employees</h1>
            <a href="/">Home</a>
            <GlobalFilter
                globalFilter={globalFilter}
                setGlobalFilter={setGlobalFilter}
            />
            <div>
                <label>
                    Show{" "}
                    <select
                        value={pageSize}
                        onChange={(e) => setPageSize(Number(e.target.value))}
                    >
                        {[10, 20, 30, 40, 50].map((pageSize) => (
                            <option key={pageSize} value={pageSize}>
                                {pageSize}
                            </option>
                        ))}
                    </select>{" "}
                    entries
                </label>
            </div>
            <table {...getTableProps()} className="display">
                <thead>
                    {headerGroups.map((headerGroup, index) => (
                        <tr
                            {...headerGroup.getHeaderGroupProps()}
                            key={`header-group-${index}`}
                        >
                            {headerGroup.headers.map((column, index) => (
                                <th
                                    {...column.getHeaderProps(
                                        column.getSortByToggleProps()
                                    )}
                                    key={`header-${index}`}
                                    className={
                                        column.isSorted
                                            ? column.isSortedDesc
                                                ? "sorted-desc"
                                                : "sorted-asc"
                                            : ""
                                    }
                                >
                                    {column.render("Header")}
                                    <span className="sort-icon"> ↕️</span>
                                    <span>
                                        {column.isSorted
                                            ? column.isSortedDesc
                                                ? " 🔽"
                                                : " 🔼"
                                            : ""}
                                    </span>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map((row, rowIndex) => {
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
            <div className="pagination">
                <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                    {"<<"}
                </button>{" "}
                <button
                    onClick={() => previousPage()}
                    disabled={!canPreviousPage}
                >
                    {"<"}
                </button>{" "}
                <button onClick={() => nextPage()} disabled={!canNextPage}>
                    {">"}
                </button>{" "}
                <button
                    onClick={() => gotoPage(pageCount - 1)}
                    disabled={!canNextPage}
                >
                    {">>"}
                </button>{" "}
                <span>
                    Page{" "}
                    <strong>
                        {pageIndex + 1} of {pageOptions.length}
                    </strong>{" "}
                </span>
                <span>
                    | Go to page:{" "}
                    <input
                        type="number"
                        defaultValue={pageIndex + 1}
                        onChange={(e) => {
                            const page = e.target.value
                                ? Number(e.target.value) - 1
                                : 0;
                            gotoPage(page);
                        }}
                        style={{ width: "100px" }}
                    />
                </span>
            </div>
        </div>
    );
};

export default EmployeesList;
