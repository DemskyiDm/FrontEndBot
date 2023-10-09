import React, { useEffect, useState, useMemo } from "react";
import { Checkbox } from "../checkBox/Checkbox";
import {
  useTable,
  usePagination,
  useGlobalFilter,
  useSortBy,
  useFilters,
} from "react-table";
import { columnsPotr } from "./columnsPotr";
import { GlobalFilter } from "../filters/GlobalFilter";
import { ColumnFilter } from "../filters/ColumnFilter";
import EditPotr from "./EditPotr";
import AddPotr from "./AddPotr";
import "../styles/table.css";

const BazaPotrPage = () => {
  const columns = useMemo(() => columnsPotr, []);
  const [appState, setAppState] = useState({ potracenia: [] });
  const defaultColumn = useMemo(() => {
    return {
      Filter: ColumnFilter,
    };
  }, []);

  const [editingPotracenia, setEditingPotracenia] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newPotracenia, setNewPotracenia] = useState({
    dedutcions_date: "",
    dedustions_id:"",
    employee_id: "",
    employee_first_name: "",
    employee_last_name: "",
    year: "",
    month: "",
    amount: "",
  });
  const handleInputAddChange = (event) => {
    const { name, value } = event.target;
    setNewPotracenia({
      ...newPotracenia,
      [name]: value,
    });
  };
  const updatePotraceniaList = () => {
    fetch("http://localhost:8080/potracenialist")
      .then((response) => response.json())
      .then((data) => {
        setAppState({ potracenia: data });
      })
      .catch((error) => {
        console.error("Błąd w trakcie otrzymania listy zaliczek:", error);
      });
  };

  useEffect(() => {
    const url = "http://localhost:8080/potracenialist";
    fetch(url)
      .then((response) => response.json())
      .then((data) => setAppState({ potracenia: data }))
      .catch((error) => {
        console.error("Błąd w trakcie otrzymania listy zaliczek:", error);
      });
  }, []);

  const handleCancelEdit = () => {
    setEditingPotracenia(null);
  };

  const handleAddCancelEdit = () => {
    setNewPotracenia("");
    setIsAddModalOpen(false);
  };

  const handleUpdatePotracenia = () => {
    const { ...updatedPotracenia } = editingPotracenia;
    const url = `http://localhost:8080/potracenia/${editingPotracenia.id}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedPotracenia),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Dane pracownika zaktualizowane:", data);
        updatePotraceniaList();
        setEditingPotracenia(null);
      })
      .catch((error) => {
        console.error("Błąd w trakcie aktualizacji danych pracownika:", error);
      });
  };

  const handleUpdatePotraceniaInList = (updatedpotracenia) => {
    console.log("Type of appState.potracenia:", typeof appState.potracenia);
    const updatedPotracenia = appState.potracenia.map((potracenia) =>
      potracenia.dedustions_id === updatedpotracenia.dedustions_id
        ? updatedpotracenia
        : potracenia
    );
    setAppState({ ...appState, potracenia: updatedpotracenia });
  };

  const handleInputChange = (event) => {
    setEditingPotracenia({
      ...editingPotracenia,
      [event.target.name]: event.target.value,
    });
  };

  //------------

  const handleAddPotracenia = () => {
    const { ...nowePotracenie } = newPotracenia;

    console.log(nowePotracenie);
    fetch("http://localhost:8080/addpotracenia", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(nowePotracenie),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Potrącenie dodane:", data);
        updatePotraceniaList();
        setIsAddModalOpen(false);
        setNewPotracenia("");
      })
      .catch((error) => {
        console.error("Błąd przy dodanie pracownika:", error);
      });
  };

  const openModal = (potraceniaId) => {
    const selectedPotracenia = appState.potracenia.find(
      (potracenia) => potracenia.dedustions_id === potraceniaId
    );
    setEditingPotracenia(selectedPotracenia);
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

  const handleDeletePotracenia = (potraceniaId) => {
    const url = `http://localhost:8080/potracenia/${potraceniaId}`;
    fetch(url, { method: "DELETE" })
      .then((response) => response.json())
      .then((data) => {
        console.log("Dane potrąceń pracownika usunięte:", data);
        updatePotraceniaList();
        console.log("Usunięte dane potrąceń pracownika z id:", potraceniaId);
      })
      .catch((error) => {
        console.error("Błąd w trakcie usunięcia potrąceń pracownika:", error);
      });
  };

  const data = useMemo(() => appState.potracenia, [appState.potracenia]);
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
        sortBy: [{ id: columnsPotr[0].accessor, desc: false }],
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
                <span>Dodaj potrącenie</span>
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
                  <button onClick={() => openModal(row.original.dedustions_id)}>
                    Edit
                  </button>
                  <button
                    onClick={() =>
                      handleDeletePotracenia(row.original.dedustions_id)
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
      {isModalOpen && editingPotracenia && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            {editingPotracenia ? (
              <EditPotr
                potracenia={editingPotracenia}
                //handleAddPotracenia={handleAddPotracenia}
                handleUpdatePotracenia={handleUpdatePotracenia}
                handleInputChange={handleInputChange}
                handleInputAddChange={handleInputAddChange}
                handleCancelEdit={handleCancelEdit}
                updatePotraceniaList={updatePotraceniaList}
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
              <AddPotr
                newPotracenia={newPotracenia}
                setNewPotracenia={setNewPotracenia}
                handleAddPotracenia={handleAddPotracenia}
                handleInputChange={handleInputAddChange}
                handleAddCancelEdit={handleAddCancelEdit}
                updatePotraceniaList={updatePotraceniaList}
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

export default BazaPotrPage;
