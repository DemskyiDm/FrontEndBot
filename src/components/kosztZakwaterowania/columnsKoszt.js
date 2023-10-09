import { ColumnFilter } from "../filters/ColumnFilter";

export const columnsKoszt = [
  {
    Header: "id",
    Footer: "id",
    accessor: "housing_cost_id",
    disableFilters: true,
  },

  {
    Header: "id_pracownika",
    Footer: "id_pracownika",
    accessor: "employee_id",
  
  },
  {
    Header: "imię",
    Footer: "imię",
    accessor: "employee_first_name",
  },
  {
    Header: "nawisko",
    Footer: "nazwisko",
    accessor: "employee_last_name",
  },
  {
    Header: "id mieszkania",
    Footer: "id mieszkania",
    accessor: "residence_address_id",
  },
  {
    Header: "Data zakwaterowania",
    Footer: "Data zakwaterowania",
    accessor: "start_date",
  },
  {
    Header: "Data wyjazdu",
    Footer: "Data wyjazdu",
    accessor: "end_date",
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
    Header: "Cena",
    Footer: "Cena",
    accessor: "value_accommodation",
  },

  {
    Header: "wartość",
    Footer: "wartość",
    accessor: "cost",
  },
];
