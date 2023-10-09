import { ColumnFilter } from "../filters/ColumnFilter";

export const columnsSalary = [
  {
    Header: "id",
    Footer: "id",
    accessor: "payroll_id",
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
    Header: "Kwota wynadgrodzenia",
    Footer: "Kwota wynadgrodzenia",
    accessor: "salary_amount",
  },
  {
    Header: "Koszt zakwaterowania",
    Footer: "Koszt zakwaterowania",
    accessor: "housing_cost",
  },
  {
    Header: "Potrącenia",
    Footer: "Potrącenia",
    accessor: "deductions",
  },
  
  {
    Header: "Zaliczki",
    Footer: "Zaliczki",
    accessor: "advances",
  },

  {
    Header: "Kara",
    Footer: "Kara",
    accessor: "penalties",
  },
  {
    Header: "Do wypłaty",
    Footer: "Do wypłaty",
    accessor: "net_payout",
  },
];
