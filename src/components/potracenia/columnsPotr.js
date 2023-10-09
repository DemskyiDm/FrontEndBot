import { ColumnFilter } from "../filters/ColumnFilter";

export const columnsPotr = [
  {
    Header: "id",
    Footer: "id",
    accessor: "dedustions_id",
    disableFilters: true,
  },
  {
    Header: "Data potrącenia",
    Footer: "Data potrącenia",
    accessor: "dedutcions_date",
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
    Header: "Kwota potrącenia",
    Footer: "Kwota potrącenia",
    accessor: "amount",
    
  },
 
];
