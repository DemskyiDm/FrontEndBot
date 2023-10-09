import { ColumnFilter } from "../filters/ColumnFilter";

export const columnsAvanse = [
  {
    Header: "id",
    Footer: "id",
    accessor: "advance_id",
    disableFilters: true,
  },
  
  {
    Header: "id_pracownika",
    Footer: "id_pracownika",
    accessor: "employee_id",
    disableFilters: true,
  },
  {
    Header: "Imie",
    Footer: "Imie",
    accessor: "employee_first_name",
  },
  {
    Header: "Nazwisko",
    Footer: "Nazwisko",
    accessor: "employee_last_name",
  },
   {
    Header: "Data zaliczki",
    Footer: "Data zaliczki",
    accessor: "advance_date",
  },
  {
    Header: "Kwota zaliczki",
    Footer: "Kwota zaliczki",
    accessor: "advance_amount",
  },
  {
    Header: "Numer tygodnia",
    Footer: "Numer tygodnia",
    accessor: "week_number",
    
  },
 
];
