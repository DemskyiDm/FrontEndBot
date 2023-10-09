import React, { useEffect, useState, useMemo } from "react";
import {
  useTable,
  usePagination,
  useGlobalFilter,
  useSortBy,
  useFilters,
} from "react-table";
import { getColumnsWH } from "./columnsWorkHours";
import { GlobalFilter } from "../filters/GlobalFilter";
import { ColumnFilterWorkHour } from "./ColumnFilterWorkHour";
import EditWorkHours from "./EditWorkHours";
import "../styles/table.css";

const BazaWorkHours = () => {
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [appState, setAppState] = useState({ workHours: [] });
  const [editedValues, setEditedValues] = useState({});
  const [editedData, setEditedData] = useState({});

  const defaultColumn = useMemo(() => {
    return {
      Filter: ColumnFilterWorkHour,
    };
  }, []);
  
  const [showTable, setShowTable] = useState(false);
  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);

  const columns = useMemo(() => {
    const columns = getColumnsWH(
      selectedYear,
      selectedMonth,
      appState.workHours
    );
    columns.push({
      Header: "Suma",
      accessor: "Suma",
    });
    return columns;
  }, [selectedYear, selectedMonth, appState.workHours]);

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const sendToBackEnd = () => {
    if (selectedYear && selectedMonth) {
      const year = selectedYear;
      const month = selectedMonth;
      setShowTable(true);
      const url = new URL("http://localhost:8080/listHours");
      url.searchParams.append("year", year);
      url.searchParams.append("month", month);
      fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          const updatedData = data.map((record) => {
            const updatedRecord = { ...record };
            daysInMonth.forEach((day) => {
              const dayKey = `day${day}`;
              updatedRecord[dayKey] =
                record.day === `${day}` ? record.work_hours : "";
            });
            return updatedRecord;
          });
          setAppState({ workHours: updatedData });
          console.log("Dane dodane:", updatedData);
        })
        .catch((error) => {
          console.error("Błąd:", error);
          alert("błąd", error);
        });
    }
  };

  const data = useMemo(() => {
    const workHoursData = [];
    appState.workHours.forEach((workHour) => {
      const existingRecord = workHoursData.find(
        (record) => record.employee_id === workHour.employee_id
      );
      if (existingRecord) {
        existingRecord[`day${workHour.day}`] = workHour.work_hours;
      } else {
        const newRecord = {
          employee_id: workHour.employee_id,
          employee_first_name: workHour.pracownikWorkHours.employee_first_name,
          employee_last_name: workHour.pracownikWorkHours.employee_last_name,
          year: workHour.year,
          month: workHour.month,
        };
        newRecord[`day${workHour.day}`] = workHour.work_hours;
        workHoursData.push(newRecord);
      }
    });
    workHoursData.forEach((record) => {
      record.Suma = Object.values(record)
        .filter((value) => typeof value === "number")
        .reduce((acc, value) => acc + (value || 0), 0);
    });
    return workHoursData;
  }, [appState.workHours]);

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
        sortBy: [{ id: columns[0].accessor, desc: false }],
      },
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { globalFilter } = state;
  const { pageIndex, pageSize } = state;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const handleRowClick = (row) => {
    setSelectedRow(row);
  };

  const openModal = (row) => {
    setSelectedRow(row);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const updateWorkHoursList = (year, month) => {
    const url = new URL("http://localhost:8080/listHours");
    url.searchParams.append("year", year);
    url.searchParams.append("month", month);
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const updatedData = data.map((record) => {
          const updatedRecord = { ...record };
          daysInMonth.forEach((day) => {
            const dayKey = `day${day}`;
            updatedRecord[dayKey] =
              record.day === `${day}` ? record.work_hours : "";
          });
          return updatedRecord;
        });
        setAppState({ workHours: updatedData });
        console.log("Dane dodane:", updatedData);
      })
      .catch((error) => {
        console.error("Błąd:", error);
        alert("błąd", error);
      });
  };

  const handleUpdateHours = (editedData) => {
    const updatedData = [];
    const employee_id = editedData.employee_id;
    const year = selectedYear;
    const month = selectedMonth;

    for (const key in editedData) {
      if (key.startsWith("day")) {
        const day = key.slice(3); 
        const work_hours = editedData[key];
        updatedData.push({
          employee_id: employee_id,
          year: year,
          month: month,
          day: day,
          work_hours: work_hours,
        });
      }
    }
    console.log("updatedData", updatedData);
    console.log("tut", updatedData);
    const url = `http://localhost:8080/editworkhours`;
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Dane pracownika zaktualizowane:", data);
        sendToBackEnd();
        updateWorkHoursList(year, month);
        setSelectedRow(null);
        setEditedValues({});
        setEditedData({});
      })
      .catch((error) => {
        console.error("Błąd w trakcie aktualizacji danych pracownika:", error);
      });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSelectedRow((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
    setEditedValues({
      ...editedValues,
      [name]: value,
    });
  };

  const handleCancelEdit = () => {
    setSelectedRow(null);
  };

  return (
    <>
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      <h4>wybierz okres, za który trzeba sprawdzić godziny pracy</h4>
      <div className="select-container">
        <div className="select-group">
          <span>Rok</span>
          <select
            value={selectedYear}
            onChange={handleYearChange}
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
            value={selectedMonth}
            onChange={handleMonthChange}
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
            Pokaż godziny za {selectedMonth} miesiąc {selectedYear} roku
          </button>
        </div>
      </div>

      {showTable && (
        <div>
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
                        {column.canFilter ? (
                          <ColumnFilterWorkHour
                            column={column}
                            filterColumnId={column.id}
                            year={selectedYear}
                            month={selectedMonth}
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
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <td
                          {...cell.getCellProps()}
                          onClick={() => handleRowClick(row)}
                        >
                          {cell.render("Cell")}
                        </td>
                      );
                    })}
                    <td>
                      <button onClick={() => openModal(row)}>Edit</button>
                      
                    </td>
                  </tr>
                );
              })}

              <tr>
                <td></td>
              </tr>
            </tbody>
          </table>

          {isModalOpen && selectedRow && (
            <div className="modal">
              <div className="modal-content">
                <span className="close" onClick={closeModal}>
                  &times;
                </span>
                {selectedRow ? (
                  <EditWorkHours
                    selectedRow={selectedRow}
                    editedValues={editedValues}
                    handleUpdateHours={handleUpdateHours}
                    handleInputChange={handleInputChange}
                    handleCancelEdit={handleCancelEdit}
                    columns={columns}
                  />
                ) : null}
              </div>
            </div>
          )}

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
              {[10, 25, 50, data.length].map((pageSize) => (
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
            <button
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
            >
              {">>"}
            </button>
          </div>
        </div>
      )}

      <br></br>
      <a
        href="#"
        className="center-link"
        onClick={() => window.history.back()}
        style={{ fontSize: "12px" }}
      >
        Powrót na ekran startowy
      </a>
    </>
  );
};

export default BazaWorkHours;
