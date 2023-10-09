import React, { useEffect, useState, useMemo } from "react";
import { Checkbox } from "../checkBox/Checkbox";
import {
  useTable,
  usePagination,
  useGlobalFilter,
  useSortBy,
  useFilters,
} from "react-table";
import { columnsAvanse } from "./columnsAvanse";
import { GlobalFilter } from "../filters/GlobalFilter";
import { ColumnFilter } from "../filters/ColumnFilter";
import EditAvanse from "./EditAvanse";
import "../styles/table.css";

const BazaZaliczekPage = () => {
  const columns = useMemo(() => columnsAvanse, []);
  const [appState, setAppState] = useState({ avanses: [] });
  const defaultColumn = useMemo(() => {
    return {
      Filter: ColumnFilter,
    };
  }, []);

  const [editingAvanses, setEditingAvanses] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const updateAvanseList = () => {
    fetch("http://localhost:8080/avanselist")
      .then((response) => response.json())
      .then((data) => {
        setAppState({ avanses: data });
      })
      .catch((error) => {
        console.error("Błąd w trakcie otrzymania listy zaliczek:", error);
      });
  };

  useEffect(() => {
    const url = "http://localhost:8080/avanselist";
    fetch(url)
      .then((response) => response.json())
      .then((data) => setAppState({ avanses: data }))
      .catch((error) => {
        console.error("Błąd w trakcie otrzymania listy zaliczek:", error);
      });
  }, []);

  const handleCancelEdit = () => {
    setEditingAvanses(null);
  };

  const [weekNumber, setWeekNumber] = useState("");

  const getWeekNumberFromDate = (date) => {
    const currentDate = new Date(date);
    const startOfYear = new Date(currentDate.getFullYear(), 0, 1);
    const days = Math.floor(
      (currentDate - startOfYear) / (24 * 60 * 60 * 1000)
    );
    const weekNumber = Math.ceil((days + startOfYear.getDay() + 1) / 7);
    return weekNumber;
  };

  const handleUpdateAvanses = () => {
    const { ...updatedAvanses } = editingAvanses;
    updatedAvanses.week_number = getWeekNumberFromDate(
      editingAvanses.advance_date
    );
    console.log(updatedAvanses);
    const url = `http://localhost:8080/avanses/${editingAvanses.id}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedAvanses),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Dane pracownika zaktualizowane:", data);
        updateAvanseList();
        setEditingAvanses(null);
      })
      .catch((error) => {
        console.error("Błąd w trakcie aktualizacji danych pracownika:", error);
      });
  };

  //---------
  const handleUpdateAvansesInList = (updatedavanses) => {
    const updatedAvansess = appState.avanses.map((avanses) =>
      avanses.advance_id === updatedavanses.advance_id
        ? updatedavanses
        : avanses
    );
    setAppState({ ...appState, avanses: updatedAvansess });
  };

  const handleInputChange = (event) => {
    setEditingAvanses({
      ...editingAvanses,
      [event.target.name]: event.target.value,
    });
  };

  const openModal = (advanceId) => {
    const selectedAvanses = appState.avanses.find(
      (avanses) => avanses.advance_id === advanceId
    );
    setEditingAvanses(selectedAvanses);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDeleteAvanses = (advanceId) => {
    const url = `http://localhost:8080/avanses/${advanceId}`;
    fetch(url, { method: "DELETE" })
      .then((response) => response.json())
      .then((data) => {
        console.log("Dane zaliczki pracownika usunięte:", data);
        updateAvanseList();
        console.log("Usunięte dane zaliczki pracownika z id:", advanceId);
      })
      .catch((error) => {
        console.error("Błąd w trakcie usunięcia zaliczki pracownika:", error);
      });
  };

  const data = useMemo(() => appState.avanses, [appState.avanses]);
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
        sortBy: [{ id: columnsAvanse[0].accessor, desc: false }],
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
                  <div>{column.canFilter ? column.render("Filter") : null}</div>
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
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
                <td>
                  <button onClick={() => openModal(row.original.advance_id)}>
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteAvanses(row.original.advance_id)}
                  >
                    {" "}
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}

          <tr>
            <td></td>
          </tr>
        </tbody>
      </table>
      {isModalOpen && editingAvanses && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            {editingAvanses ? (
              <EditAvanse
                avanses={editingAvanses}
                handleUpdateAvanses={handleUpdateAvanses}
                handleInputChange={handleInputChange}
                handleCancelEdit={handleCancelEdit}
                handleUpdateAvansesInList={handleUpdateAvansesInList}
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

export default BazaZaliczekPage;
