import React, { useEffect, useState, useMemo } from "react";
import { Checkbox } from "../checkBox/Checkbox";
import {
  useTable,
  usePagination,
  useGlobalFilter,
  useSortBy,
  useFilters,
} from "react-table";
import { columnsSalary } from "./columnsSalary";
import { GlobalFilter } from "../filters/GlobalFilter";
import { ColumnFilterSalary } from "./ColumnFilterSalary";
import "../styles/table.css";

const Salary = () => {
  const columns = useMemo(() => columnsSalary, []);
  const [appState, setAppState] = useState({ salary: [] });

  const defaultColumn = useMemo(() => {
    return {
      Filter: ColumnFilterSalary,
    };
  }, []);

  const [editingSalary, setEditingSalary] = useState({
    year: "",
    month: "",
  });

  const updateSalaryList = () => {
    fetch("http://localhost:8080/salary/salarylist")
      .then((response) => response.json())
      .then((data) => {
        setAppState({ salary: data });
      })
      .catch((error) => {
        console.error("Błąd w trakcie otrzymania listy wynagrodzeń:", error);
      });
  };

  
  useEffect(() => {
    const url = "http://localhost:8080/salary/salarylist";
    fetch(url)
      .then((response) => response.json())
      .then((data) => setAppState({ salary: data }))
      .catch((error) => {
        console.error("Błąd w trakcie otrzymania listy kosztów:", error);
      });
  }, []);

  const handleInputChange = (event) => {
    setEditingSalary({
      ...editingSalary,
      [event.target.name]: event.target.value,
    });
  };

  const data = useMemo(() => appState.salary, [appState.salary]);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    allColumns,
    getToggleHideAllColumnsProps,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    setPageSize,
    state,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      initialState: {
        sortBy: [{ id: columnsSalary[0].accessor, desc: false }],
      },
      manualPagination: false,
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { globalFilter } = state;
  const { pageIndex, pageSize } = state;

  const sendToBackEnd = () => {
    if (editingSalary.year && editingSalary.month) {
      const dataToSend = {
        year: editingSalary.year,
        month: editingSalary.month,
      };
      const url = new URL("http://localhost:8080/salary/checkAndUpdateSalary");
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      })
        .then((response) => response.json())
        .then((data) => {
          updateSalaryList();
          
          console.log("Dane dodane:", data);
          /*alert(data.message);*/
        })
        .catch((error) => {
          console.error("Błąd:", error);
          alert("bład", error);
        });
    }
  };

  const handleDeleteKoszt = (salaryId) => {
    const url = `http://localhost:8080/salary/salary/${salaryId}`;
    fetch(url, { method: "DELETE" })
      .then((response) => response.json())
      .then((data) => {
        updateSalaryList();
        console.log("handleDeleteKoszt");
        console.log("Usunięte dane wynagrodzenia pracownika z id:", salaryId);
      })
      .catch((error) => {
        console.error(
          "Błąd w trakcie usunięcia wynagrodzenia pracownika:",
          error
        );
      });
  };

  return (
    <>
      <div className="checkbox-grid" style={{ fontSize: "9px" }}>
        <div>
          <Checkbox {...getToggleHideAllColumnsProps()} /> Toggle All
        </div>
        {allColumns.map((column) => (
          <div key={column.id} className="checkbox-container">
            <Checkbox {...column.getToggleHiddenProps()} />
            <span>{column.Header}</span>
          </div>
        ))}
      </div>
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      <h4>wybierz okres, za który trzeba obliczyć wynagrodzenia</h4>
      <div className="select-container">
        <div className="select-group">
          <span>Rok</span>
          <select
            value={editingSalary.year}
            onChange={handleInputChange}
            name="year"
            className="form-control"
            required
          >
            <option value="">Wybierz rok</option>
            <option value="2020">2020</option>
            <option value="2021">2021</option>
            <option value="2022">2022</option>
            <option value="2023">2023</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
          </select>
        </div>
        <div className="select-group">
          <span>Miesiąc</span>
          <select
            value={editingSalary.month}
            onChange={handleInputChange}
            name="month"
            className="form-control"
            required
          >
            <option value="">Wybierz miesiąc</option>
            <option value="1">styczeń</option>
            <option value="2">luty</option>
            <option value="3">marzec</option>
            <option value="4">kwiecień</option>
            <option value="5">maj</option>
            <option value="6">czerwiec</option>
            <option value="7">lipiec</option>
            <option value="8">sierpień</option>
            <option value="9">wrzesień</option>
            <option value="10">październik</option>
            <option value="11">listopad</option>
            <option value="12">grudzień</option>
          </select>
        </div>
        <div
          className="select-group"
          style={{ display: "flex", alignItems: "center" }}
        >
          <button style={{ alignSelf: "center" }} onClick={sendToBackEnd}>
            Obliczenie wynagrodzeń za {editingSalary.month} miesiąc{" "}
            {editingSalary.year} roku
          </button>
        </div>
      </div>

      <table {...getTableProps()}>
        <thead style={{ fontSize: "9px" }}>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, columnIndex) => (
                <th
                  {...column.getHeaderProps(
                    columnIndex === 0 ? column.getSortByToggleProps() : {}
                  )}
                >
                  {column.render("Header")}
                  <div>
                    {" "}
                    {column.canFilter ? (
                      <ColumnFilterSalary
                        column={column}
                        filterColumnId={column.id}
                        year={editingSalary.year} // Передаємо рік
                        month={editingSalary.month} // Передаємо місяць
                      />
                    ) : null}
                  </div>
                  {columnIndex === 0 && (
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? " 🔽"
                          : " 🔼"
                        : ""}
                    </span>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()} style={{ fontSize: "9px" }}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr key={row.original.payroll_id} {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
                {
                  <td>
                    <button
                      onClick={() => handleDeleteKoszt(row.original.payroll_id)}
                    >
                      {" "}
                      Delete
                    </button>
                  </td>
                }
              </tr>
            );
          })}

          <tr>
            <td></td>
          </tr>
        </tbody>
      </table>
      
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "9px",
        }}
      >
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
          {"  "}
        </span>{" "}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "9px",
        }}
      >
        <span>
          Go to page:{" "}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const pageNumber = e.target.value
                ? Number(e.target.value) - 1
                : 0;
              gotoPage(pageNumber);
            }}
            style={{ width: "50px" }}
          />
        </span>
        <select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
        >
          {[10, 25, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>{" "}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "9px",
        }}
      >
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {"<<"}
        </button>
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          Previous
        </button>
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          Next
        </button>
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {">>"}
        </button>
      </div>
      <a
        href="#"
        className="center-link"
        onClick={() => window.history.back()}
        style={{ fontSize: "9px" }}
      >
        Powrót na ekran startowy
      </a>
    </>
  );
};

export default Salary;
