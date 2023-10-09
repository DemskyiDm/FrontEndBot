import React, { useEffect, useState, useMemo } from "react";
import { Checkbox } from "../checkBox/Checkbox";
import {
  useTable,
  usePagination,
  useGlobalFilter,
  useSortBy,
  useFilters,
} from "react-table";
import { columnsKoszt } from "./columnsKoszt";
import { GlobalFilter } from "../filters/GlobalFilter";
import { ColumnFilterKoszt } from "./ColumnFilterKoszt";
import "../styles/table.css";

const KosztZakwaterowania = () => {
  const columns = useMemo(() => columnsKoszt, []);
  const [appState, setAppState] = useState({ avanses: [] });

  const defaultColumn = useMemo(() => {
    return {
      Filter: ColumnFilterKoszt,
    };
  }, []);

  const [editingKoszt, setEditingKoszt] = useState({
    year: "",
    month: "",
  });

  const updateKosztList = () => {
    fetch("http://localhost:8080/kosztlist")
      .then((response) => response.json())
      .then((data) => {
        setAppState({ avanses: data });
      })
      .catch((error) => {
        console.error("Błąd w trakcie otrzymania listy zaliczek:", error);
      });
  };

  useEffect(() => {
    const url = "http://localhost:8080/kosztlist";
    fetch(url)
      .then((response) => response.json())
      .then((data) => setAppState({ avanses: data }))
      .catch((error) => {
        console.error("Błąd w trakcie otrzymania listy kosztów:", error);
      });
  }, []);

  const handleInputChange = (event) => {
    setEditingKoszt({
      ...editingKoszt,
      [event.target.name]: event.target.value,
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
        sortBy: [{ id: columnsKoszt[0].accessor, desc: false }],
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
    if (editingKoszt.year && editingKoszt.month) {
      const dataToSend = {
        year: editingKoszt.year,
        month: editingKoszt.month,
      };
      const url = new URL("http://localhost:8080/koszt/checkAndUpdate");
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      })
        .then((response) => response.json())
        .then((data) => {
          updateKosztList();
          console.log("Dane dodane:", data);
          alert(data.message);
        })
        .catch((error) => {
          console.error("Błąd:", error);
          alert("bład", error);
        });
    }
  };

  const handleDeleteKoszt = (housingId) => {
    const url = `http://localhost:8080/koszty/${housingId}`;
    fetch(url, { method: "DELETE" })
      .then((response) => response.json())
      .then((data) => {
        console.log("Dane kosztów pracownika usunięte:", data);
        updateKosztList();
        console.log("Usunięte dane kosztów pracownika z id:", housingId);
      })
      .catch((error) => {
        console.error("Błąd w trakcie usunięcia zaliczki pracownika:", error);
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
      <h4>wybierz okres, za który trzeba obliczyć koszty zamieszkania</h4>
      <div className="select-container">
        <div className="select-group">
          <span>Rok</span>
          <select
            value={editingKoszt.year}
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
            value={editingKoszt.month}
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
            Obliczenie kosztów zakwaterowania za {editingKoszt.month} miesiąc{" "}
            {editingKoszt.year} roku
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
                      <ColumnFilterKoszt
                        column={column}
                        filterColumnId={column.id}
                        year={editingKoszt.year} // Передаємо рік
                        month={editingKoszt.month} // Передаємо місяць
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
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
                { <td>
                  
                  <button
                    onClick={() => handleDeleteKoszt(row.original.housing_cost_id)}
                  >
                    {" "}
                    Delete
                  </button>
              </td>}
              </tr>
            );
          })}

          <tr>
            <td></td>
          </tr>
        </tbody>
      </table>
      {/*   {isModalOpen && editingAvanses && (
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
      )}*/}
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

export default KosztZakwaterowania;

//---------
/*
 const handleCancelEdit = () => {
    setEditingAvanses(null);
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
       // handleUpdateAvansesInList(updatedAvanses);
        updateAvanseList();
        setEditingAvanses(null);
      })
      .catch((error) => {
        console.error("Błąd w trakcie aktualizacji danych pracownika:", error);
      });
  };
 
  const handleUpdateAvansesInList = (updatedavanses) => {
    const updatedAvansess = appState.avanses.map((avanses) =>
      avanses.advance_id === updatedavanses.advance_id
        ? updatedavanses
        : avanses
    );
    setAppState({ ...appState, avanses: updatedAvansess });
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

  

  */
