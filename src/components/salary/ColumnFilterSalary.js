import React, { useState, useEffect } from "react";
import { useAsyncDebounce } from "react-table";

export const ColumnFilterSalary = ({ column, filterColumnId, year, month }) => {
  const { filterValue, setFilter } = column;

  const [value, setValue] = useState(filterValue || "");

  const onChange = useAsyncDebounce((value) => {
    setFilter(value || undefined);
  }, 1000);

  useEffect(() => {
    if (filterColumnId === "year") {
      setValue(year || "");
      onChange(year || "");
    } else if (filterColumnId === "month") {
      setValue(month || "");
      onChange(month || "");
    }
  }, [filterColumnId, year, month]);

  return (
    <span style={{ width: "50px", display: "inline-block" }}>
      <input
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
         setFilter(e.target.value === "" ? undefined : e.target.value);

        }}
        style={{ width: "100%" }}
      />
    </span>
  );
};
