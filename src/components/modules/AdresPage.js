import React, { useEffect, useState, useMemo } from "react";
import {
  useTable,
  usePagination,
  useGlobalFilter,
  useSortBy,
  useFilters,
} from "react-table";
import { COLUMNSADRES } from "../adres/columnsAdres";
import { ColumnFilter } from "../filters/ColumnFilter";
import "../styles/table.css";

export const EditAdresPage = (props) => {
  const columns = useMemo(() => COLUMNSADRES, []);
  const [appState, setAppState] = useState({ adreses: [] });
  const defaultColumn = useMemo(() => {
    return {
      Filter: ColumnFilter,
    };
  }, []);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const updateAdresList = () => {
    fetch("http://localhost:8080/alladreslist")
      .then((response) => response.json())
      .then((data) => {
        setAppState({ adreses: data });
      })
      .catch((error) => {
        console.error("Błąd w trakcie otrzymania listy adresów:", error);
      });
  };

  useEffect(() => {
    const url = "http://localhost:8080/alladreslist";
    fetch(url)
      .then((response) => response.json())
      .then((data) => setAppState({ adreses: data }))
      .catch((error) => {
        console.error("Błąd w trakcie otrzymania listy adresów:", error);
      });
  }, []);

  const data = useMemo(() => appState.adreses, [appState.adreses]);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    setPageSize,
    state,
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

  const { pageSize } = state;
  const handleAdresClick = (selectedAdres) => {
    setSelectedAddress(selectedAdres);
    console.log(selectedAddress);
  };

  return (
    <>
      <table {...getTableProps()}>
        <thead style={{ fontSize: "12px" }}>
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
        <tbody {...getTableBodyProps()} style={{ fontSize: "11px" }}>
          {page.map((row, index) => {
            prepareRow(row);
            return (
              <tr key={index} {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td key={cell.column.id} {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </td>
                  );
                })}
                <td>
                  <button
                    onClick={() => {
                      props.onSaveAddress(row.original);
                      handleAdresClick(row.original);
                      props.handleAdresClick(row.original);
                    }}
                  >
                    Choose
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "11px",
        }}
      >
        <select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
        >
          {[
            { value: 10, label: "Show 10" },
            { value: 25, label: "Show 25" },
            { value: 51, label: "Show 51" },
            { value: data.length, label: `Show ${data.length}` },
          ].map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default EditAdresPage;
