import { ColumnFilter } from "../filters/ColumnFilter";

export const COLUMNSEDITADRES = [
  {
    Header: "id",
    Footer: "id",
    accessor: "employee_address_id",
    disableFilters: true,
  },
  {
    Header: "id_pracownika",
    Footer: "id_pracownika",
    accessor: "employee_id",
    disableFilters: true,
  },
  {
    Header: "lastName",
    Footer: "lastName",
    accessor: "employee_last_name",
  },
  {
    Header: "firstName",
    Footer: "firstName",
    accessor: "employee_first_name",
  },
  {
    Header: "miasto",
    Footer: "miasto",
    accessor: "residence_city",
  },
  {
    Header: "ulica",
    Footer: "ulica",
    accessor: "residence_street",
  },
  {
    Header: "numerDomu",
    Footer: "numerDomu",
    accessor: "residence_home",
  },
  {
    Header: "numerMieszkania",
    Footer: "numerMieszkania",
    accessor: "residence_flat",
  },
  {
    Header: "numerPokoju",
    Footer: "numerPokoju",
    accessor: "residence_room",
  },
  {
    Header: "data początku zakwaterowania",
    Footer: "data początku zakwaterowania",
    accessor: "start_date",
  },
  {
    Header: "data zakończenia zakwaterowania",
    Footer: "data zakończenia zakwaterowania",
    accessor: "end_date",
  },
];
