import React, { useState } from "react";
import { useAsyncDebounce } from "react-table";

export const ColumnFilter = ({ column }) => {
  const { filterValue, setFilter } = column;

  const [value, setValue] = useState(filterValue || "");

  const onChange = useAsyncDebounce((value) => {
    setFilter(value || undefined);
  }, 1000);
  return (
    <span style={{ width: "50px", display: "inline-block" }}>
     
      <input
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        style={{ width: "100%" }} 
      />
    </span>
  );
};