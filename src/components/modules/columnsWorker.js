import { ColumnFilter } from "../filters/ColumnFilter";

export const columnsWorker = [
  {
    Header: "id",
    Footer: "id",
    accessor: "employee_id",
    disableFilters: true,
  },
  {
    Header: "pesel",
    Footer: "pesel",
    accessor: "employee_pesel",
  },
  {
    Header: "firstName",
    Footer: "firstName",
    accessor: "employee_first_name",
  },
  {
    Header: "lastName",
    Footer: "lastName",
    accessor: "employee_last_name",
  },
];
