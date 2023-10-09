import React, { useState } from "react";
import "../styles/styleEdit.css";

const EditWorkHours = ({
  selectedRow,
  editedValues,
  handleUpdateHours,
  handleInputChange,
  handleCancelEdit,
  columns,
}) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    if (selectedRow) {
      const updatedData = { ...selectedRow.original, ...editedValues };
      handleUpdateHours(updatedData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edytuj pracownika</h2>
      <div className="table-responsive">
        <table className="table table-striped" style={{ fontSize: "9px" }}>
          <thead>
            <tr>
              {columns.map((column) => (
                <th scope="col" className="col" key={column.accessor}>
                  {column.Header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {columns.map((column) => (
                <td key={column.accessor}>
                  <input
                    type={column.accessor.startsWith("day") ? "BigInt" : "text"}
                    style={{
                      fontSize: "10px",
                      padding: "0px",
                      margin: "0",
                      textAlign: "center",
                    }}
                    name={column.accessor}
                    value={
                      editedValues[column.accessor] ||
                      selectedRow.original[column.accessor]
                    }
                    onChange={handleInputChange}
                    className="form-control small-font-input"
                  />
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      <button type="submit" className="btn btn-primary">
        Zapisz zmiany
      </button>
      <button
        type="button"
        className="btn btn-secondary"
        onClick={handleCancelEdit}
      >
        Anuluj
      </button>
    </form>
  );
};

export default EditWorkHours;
