import React, { useEffect, useState, useMemo } from "react";
import { Checkbox } from "../checkBox/Checkbox";
import {
  useTable,
  usePagination,
  useGlobalFilter,
  useSortBy,
  useFilters,
} from "react-table";
import { COLUMNSEDITADRES } from "./columnEditAdres";
import { GlobalFilter } from "../filters/GlobalFilter";
import { ColumnFilter } from "../filters/ColumnFilter";
import EditAdresWorker from "../modules/EditAdresWorker";
import ChangeAdresWorker from "../modules/ChangeAdresWorker";
import "../styles/table.css";

export const EditEmplAdresPage = () => {
  const columns = useMemo(() => COLUMNSEDITADRES, []);
  const [appState, setAppState] = useState({ workers: [] });
  const defaultColumn = useMemo(() => {
    return {
      Filter: ColumnFilter,
    };
  }, []);

  const [editingWorker, setEditingWorker] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalChangeOpen, setIsModalChangeOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [sortConfig, setSortConfig] = useState([
    { id: COLUMNSEDITADRES[0].accessor, desc: false },
  ]);

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
      initialState: {
        sortBy: [{ id: COLUMNSEDITADRES[0].accessor, desc: false }],
        //sortBy: [{ id: COLUMNSEDITADRES[1].accessor, desc: false }],
      },
      manualPagination: false,
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const updateWorkerAdresList = () => {
    const sortBy = sortConfig[0].id;
    const desc = sortConfig[0].desc ? "desc" : "asc";

    fetch(`http://localhost:8080/adreslist?_sort=${sortBy}&_order=${desc}`)
      .then((response) => response.json())
      .then((data) => {
        setAppState({ workers: data });
      })
      .catch((error) => {
        console.error("Błąd w trakcie otrzymania listy pracowników:", error);
      });
  };

  useEffect(() => {
    const sortColumns = allColumns.filter((col) => col.isSorted);
    const newSortConfig = sortColumns.map((col) => ({
      sortBy: col.id,
      desc: col.isSortedDesc,
    }));
    setSortConfig(newSortConfig);
    updateWorkerAdresList();
  }, [allColumns]);

  useEffect(() => {
    const url = "http://localhost:8080/adreslist";
    fetch(url)
      .then((response) => response.json())
      .then((data) => setAppState({ workers: data }))
      .catch((error) => {
        console.error("Błąd w trakcie otrzymania listy pracowników:", error);
      });
  }, []);

  const handleCancelEdit = () => {
    setEditingWorker(null);
  };

  const handleUpdateWorker = () => {
    const url = `http://localhost:8080/workersAdres/${editingWorker.id}`;
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
        updateWorkerAdresList();
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

  const openChangeModal = (employeeId) => {
    const selectedWorker = appState.workers.find(
      (worker) => worker.employee_id === employeeId
    );
    setEditingWorker(selectedWorker);
    setIsModalChangeOpen(true);
  };

  const closeChangeModal = () => {
    setIsModalChangeOpen(false);
  };

  const { globalFilter } = state;
  const { pageIndex, pageSize } = state;
  const onSaveAddress = (address) => {
    setSelectedAddress(address);
    closeModal();
  };

  return (
    <>
      <div className="checkbox-grid" style={{ fontSize: "11px" }}>
        <div>
          <Checkbox {...getToggleHideAllColumnsProps()} /> Toggle All
        </div>
        {allColumns.map((column) => (
          <div
            key={column.id}
            className="checkbox-container"
            style={{ fontSize: "11px" }}
          >
            <Checkbox {...column.getToggleHiddenProps()} />
            <span>{column.Header}</span>
          </div>
        ))}
      </div>
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, columnIndex) => (
                <th
                  {...column.getHeaderProps(
                    columnIndex === 0 || columnIndex === 1
                      ? column.getSortByToggleProps()
                      : {}
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
                  {columnIndex === 1 && (
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
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
                <td style={{ fontSize: "9px" }}>
                  <button onClick={() => openModal(row.original.employee_id)}>
                    Edit
                  </button>
                  <button
                    onClick={() => openChangeModal(row.original.employee_id)}
                  >
                    Change adres
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
              <EditAdresWorker
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
      {isModalChangeOpen && editingWorker && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeChangeModal}>
              &times;
            </span>
            {editingWorker ? (
              <ChangeAdresWorker
                worker={editingWorker}
                handleUpdateWorker={handleUpdateWorker}
                handleInputChange={handleInputChange}
                handleCancelEdit={handleCancelEdit}
                handleUpdateWorkerInList={handleUpdateWorkerInList}
                closeChangeModal={closeChangeModal}
                onSaveAddress={onSaveAddress}
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
      <a href="#" className="center-link" onClick={() => window.history.back()}>
        Powrót na ekran startowy
      </a>
    </>
  );
};

export default EditEmplAdresPage;
