import React, { useEffect, useState, useMemo } from "react";
import { Checkbox } from "../checkBox/Checkbox";
import {
  useTable,
  usePagination,
  useGlobalFilter,
  useSortBy,
  useFilters,
} from "react-table";
import { COLUMNS } from "../filters/columns";
import { GlobalFilter } from "../filters/GlobalFilter";
import { ColumnFilter } from "../filters/ColumnFilter";
import EditWorker from "../modules/EditWorker";
import "../styles/table.css";

export const EditAmpPage = () => {
  const columns = useMemo(() => COLUMNS, []);
  const [appState, setAppState] = useState({ workers: [] });
  const defaultColumn = useMemo(() => {
    return {
      Filter: ColumnFilter,
    };
  }, []);

//-----
const [editingWorker, setEditingWorker] = useState(null);
const [isModalOpen, setIsModalOpen] = useState(false);
//----

  const updateWorkerList = () => {
    fetch("http://localhost:8080/workerlist")
      .then((response) => response.json())
      .then((data) => {
        setAppState({ workers: data });
      })
      .catch((error) => {
        console.error("Błąd w trakcie otrzymania listy pracowników:", error);
      });
  };

  useEffect(() => {
    const url = "http://localhost:8080/workerlist";
    fetch(url)
      .then((response) => response.json())
      .then((data) => setAppState({ workers: data }))
      .catch((error) => {
        console.error("Błąd w trakcie otrzymania listy pracowników:", error);
      });
  }, []);

  //------------

  const handleCancelEdit = () => {
    setEditingWorker(null);
  };

  const handleUpdateWorker = () => {
    const url = `http://localhost:8080/workers/${editingWorker.id}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editingWorker),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Dane pracownika zaktualizowane:", data);
        updateWorkerList();
        setEditingWorker(null);
      })
      .catch((error) => {
        console.error("Błąd w trakcie aktualizacji danych pracownika:", error);
      });
  };

  const handleUpdateWorkerInList = (updatedWorker) => {
    const updatedWorkers = appState.workers.map((worker) =>
      worker.employee_id === updatedWorker.employee_id ? updatedWorker : worker
    );
    setAppState({ ...appState, workers: updatedWorkers });
  };

  const handleInputChange = (event) => {
    setEditingWorker({
      ...editingWorker,
      [event.target.name]: event.target.value,
    });
  };

  const openModal = (employeeId) => {
    const selectedWorker = appState.workers.find(
      (worker) => worker.employee_id === employeeId
    );
    setEditingWorker(selectedWorker);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  //---------

  const data = useMemo(() => appState.workers, [appState.workers]);
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
      initialState: { sortBy: [{ id: columns[0].accessor, desc: false }] },
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
                  {/*<button onClick={() => handleDeleteWorker(worker.employee_id)}> Delete</button> */}
                  <button onClick={() => openModal(row.original.employee_id)}>
                    Edit
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
      {isModalOpen && editingWorker && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            {editingWorker ? (
              <EditWorker
                worker={editingWorker}
                handleUpdateWorker={handleUpdateWorker}
                handleInputChange={handleInputChange}
                handleCancelEdit={handleCancelEdit}
                handleUpdateWorkerInList={handleUpdateWorkerInList}
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
      <a href="#" className="center-link" onClick={() => window.history.back()} style={{fontSize: "9px",}}>
        Powrót na ekran startowy
      </a>
    </>
  );
};

export default EditAmpPage;
