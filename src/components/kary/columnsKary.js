import { ColumnFilter } from "../filters/ColumnFilter";

export const columnsKary = [
  {
    Header: "id",
    Footer: "id",
    accessor: "penalty_id",
    disableFilters: true,
  },
  
  {
    Header: "id_pracownika",
    Footer: "id_pracownika",
    accessor: "employee_id",
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
    Header: "Rok",
    Footer: "Rok",
    accessor: "year",
  },
  {
    Header: "Miesiąc",
    Footer: "Miesiąc",
    accessor: "month",
  },
  {
    Header: "Kwota kary",
    Footer: "Kwota kary",
    accessor: "penalty_amount",
    
  },
 
];
