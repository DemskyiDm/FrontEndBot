import React, { useEffect, useState, useMemo } from "react";
import { Checkbox } from "../checkBox/Checkbox";
import {
  useTable,
  usePagination,
  useGlobalFilter,
  useSortBy,
  useFilters,
} from "react-table";
import { columnsKary } from "./columnsKary";
import { GlobalFilter } from "../filters/GlobalFilter";
import { ColumnFilter } from "../filters/ColumnFilter";
import EditKary from "./EditKary";
import AddKary from "./AddKary";
import "../styles/table.css";

const BazaKaryPage = () => {
  const columns = useMemo(() => columnsKary, []);
  const [appState, setAppState] = useState({ kary: [] });
  const defaultColumn = useMemo(() => {
    return {
      Filter: ColumnFilter,
    };
  }, []);

  const [editingKary, setEditingKary] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newKary, setNewKary] = useState({
    penalty_id:"",
    employee_id: "",
    employee_first_name: "",
    employee_last_name: "",
    year: "",
    month: "",
    penalty_amount: "",
  });
  const handleInputAddChange = (event) => {
    const { name, value } = event.target;
    setNewKary({
      ...newKary,
      [name]: value,
    });
  };
  const updateKaryList = () => {
    fetch("http://localhost:8080/karalist")
      .then((response) => response.json())
      .then((data) => {
        setAppState({ kary: data });
      })
      .catch((error) => {
        console.error("Błąd w trakcie otrzymania listy kar:", error);
      });
  };

  useEffect(() => {
    const url = "http://localhost:8080/karalist";
    fetch(url)
      .then((response) => response.json())
      .then((data) => setAppState({ kary: data }))
      .catch((error) => {
        console.error("Błąd w trakcie otrzymania listy kar:", error);
      });
  }, []);

  const handleCancelEdit = () => {
    setEditingKary(null);
  };

  const handleAddCancelEdit = () => {
    setNewKary("");
    setIsAddModalOpen(false);
  };

  const handleUpdateKary = () => {
    const { ...updatedKary } = editingKary;
    const url = `http://localhost:8080/kara/${editingKary.id}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedKary),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Dane kar pracownika zaktualizowane:", data);
        updateKaryList();
        setEditingKary(null);
      })
      .catch((error) => {
        console.error("Błąd w trakcie aktualizacji danych kar pracownika:", error);
      });
  };

  const handleUpdateKaryInList = (updatedkary) => {
    console.log("Type of appState.kary:", typeof appState.kary);
    const updatedKary = appState.kary.map((kary) =>
      kary.penalty_id === updatedkary.penalty_id
        ? updatedkary
        : kary
    );
    setAppState({ ...appState, kary: updatedkary });
  };

  const handleInputChange = (event) => {
    setEditingKary({
      ...editingKary,
      [event.target.name]: event.target.value,
    });
  };

  //------------

  const handleAddKary = () => {
    const { ...nowaKara } = newKary;

    console.log(nowaKara);
    fetch("http://localhost:8080/addkary", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(nowaKara),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Kara dodana:", data);
        updateKaryList();
        setIsAddModalOpen(false);
        setNewKary("");
      })
      .catch((error) => {
        console.error("Błąd przy dodaniu kary pracownika:", error);
      });
  };

  const openModal = (karaId) => {
    const selectedKary = appState.kary.find(
      (kary) => kary.penalty_id === karaId
    );
    setEditingKary(selectedKary);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };

  const handleDeleteKary = (karaId) => {
    const url = `http://localhost:8080/kara/${karaId}`;
    fetch(url, { method: "DELETE" })
      .then((response) => response.json())
      .then((data) => {
        console.log("Dane kary pracownika usunięte:", data);
        updateKaryList();
        console.log("Usunięte dane kary pracownika z id:", karaId);
      })
      .catch((error) => {
        console.error("Błąd w trakcie usunięcia kary pracownika:", error);
      });
  };

  const data = useMemo(() => appState.kary, [appState.kary]);
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
        sortBy: [{ id: columnsKary[0].accessor, desc: false }],
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
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "12px",
                }}
              >
                <span>Dodaj karę</span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "12px",
                }}
              >
                <span>
                  <button onClick={() => openAddModal()}>Add</button>
                </span>
              </div>
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
                  <button onClick={() => openModal(row.original.penalty_id)}>
                    Edit
                  </button>
                  <button
                    onClick={() =>
                      handleDeleteKary(row.original.penalty_id)
                    }
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
      {isModalOpen && editingKary && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            {editingKary ? (
              <EditKary
                kary={editingKary}
                //handleAddPotracenia={handleAddPotracenia}
                handleUpdateKary={handleUpdateKary}
                handleInputChange={handleInputChange}
                handleInputAddChange={handleInputAddChange}
                handleCancelEdit={handleCancelEdit}
                updateKaryList={updateKaryList}
              />
            ) : null}
          </div>
        </div>
      )}
      {isAddModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeAddModal}>
              &times;
            </span>
            {isAddModalOpen && (
              <AddKary
              newKary={newKary}
              setNewKary={setNewKary}
              handleAddKary={handleAddKary}
                handleInputChange={handleInputAddChange}
                handleAddCancelEdit={handleAddCancelEdit}
                updateKaryList={updateKaryList}
                isAddModalOpen={isAddModalOpen}
                setIsAddModalOpen={setIsAddModalOpen}
              />
            )}
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

export default BazaKaryPage;
