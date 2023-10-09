import React, { useState } from "react";
import "../styles/styleEdit.css";

const EditAvanse = ({
  avanses,
  handleUpdateAvanses,
  handleInputChange,
  handleCancelEdit,
}) => {
     
  const handleSubmit = (event) => {
    event.preventDefault();
    handleUpdateAvanses();
  };


  return (
    <form onSubmit={handleSubmit}>
      <h2>Edytuj pracownika</h2>
      <div className="table-responsive">
        <table className="table table-striped" style={{ fontSize: "9px" }}>
          <thead>
            <tr>
            <th scope="col" className="col">
                id_zaliczki
              </th>
              <th scope="col" className="col">
                id_pracownika
              </th>
              <th scope="col" className="col">
                Imię
              </th>
              <th scope="col" className="col">
                Nazwisko
              </th>
              <th scope="col" className="col">
                Data zaliczki
              </th>
              <th scope="col" className="col">
                Kwota zaliczki
              </th>
              
            </tr>
          </thead>
          <tbody>
            <tr>
              
              <td>
                <input
                  type="number"
                  name="advance_id"
                  value={avanses.advance_id}
                  readOnly
                  className="form-control small-font-input"
                />
              </td>
              <td>
                <input
                  type="number"
                  name="employee_id"
                  value={avanses.employee_id}
                  readOnly
                  className="form-control small-font-input"
                />
              </td>
              <td>
                <input
                  type="text"
                  name="employee_first_name"
                  value={avanses.employee_first_name}
                  onChange={handleInputChange}
                  readOnly
                  className="form-control small-font-input"
                />
              </td>
              <td>
                <input
                  type="text"
                  name="employee_last_name"
                  value={avanses.employee_last_name}
                  onChange={handleInputChange}
                  readOnly
                  className="form-control small-font-input"
                />
              </td>
              <td>
                <input
                  type="date"
                  name="advance_date"
                  value={avanses.advance_date}
                  onChange={handleInputChange}
                  required
                  className="form-control small-font-input"
                />
              </td>
              <td>
                <input
                  type="text"
                  name="advance_amount"
                  value={avanses.advance_amount}
                  onChange={handleInputChange}
                  required
                  className="form-control small-font-input"
                />
              </td>
             
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

export default EditAvanse;
