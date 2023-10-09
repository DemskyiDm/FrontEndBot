/*
import React, { useEffect, useState, useMemo } from "react";
import { useTable, useGlobalFilter, useFilters } from "react-table";
import { COLUMNS } from "./components/columns";
import "./styles/table.css";
import { GlobalFilter } from "./components/GlobalFilter";
import { ColumnFilter } from "./components/ColumnFilter";

export const EditEmplAdresPage = () => {
  const columns = useMemo(() => COLUMNS, []);
  const [appState, setAppState] = useState({ workers: [] });

  const defaultColumn = useMemo(() =>{
    return {
      Filter: ColumnFilter
    }
  }, [])

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

  const data = useMemo(() => appState.workers, [appState.workers]);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
    },
    useFilters,
    useGlobalFilter
  );

  const { globalFilter } = state;

  return (
    <>
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th>
                  {column.render("Header")}
                  <div>{column.canFilter ? column.render('Filter') : null}</div>
                
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}

          <tr>
            <td></td>
          </tr>
        </tbody>
        <tfoot>
          {footerGroups.map((footerGroup) => (
            <tr {...footerGroup.getFooterGroupProps()}>
              {footerGroup.headers.map((column) => (
                <td {...column.getFooterGroupProps}>
                  {column.render("Footer")}
                </td>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
    </>
  );
};

export default EditEmplAdresPage;
