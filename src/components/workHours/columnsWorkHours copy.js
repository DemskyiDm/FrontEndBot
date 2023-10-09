// import { ColumnFilter } from "../filters/ColumnFilter";

// const generateDayColumns = (year, month) => {
//   const daysInMonth = new Date(year, month, 0).getDate();
//   const dayColumns = [];

//   for (let day = 1; day <= daysInMonth; day++) {
//     const column = {
//       Header: `${day}`,
//       Footer: `${day}`,
//       accessor: `${day}`, 
//     };

//     dayColumns.push(column);
//   }

//   return dayColumns;
// };

// export const  getColumnsWH = () => {
//   console.log("sadad");
//   const columns = [
//   {
//     Header: "id_pracownika",
//     Footer: "id_pracownika",
//     accessor: "employee_id",
  
//   },
//   {
//     Header: "imię",
//     Footer: "imię",
//     accessor: "employee_first_name",
//   },
//   {
//     Header: "nawisko",
//     Footer: "nazwisko",
//     accessor: "employee_last_name",
//   },
//   {
//     Header: "Rok",
//     Footer: "Rok",
//     accessor: "year",
//   },
//   {
//     Header: "Miesiąc",
//     Footer: "Miesiąc",
//     accessor: "month",
//   },
//  // ...generateDayColumns(year, month)
// ];
// return columns;
// };