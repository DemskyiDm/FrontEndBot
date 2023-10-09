import React, { useState } from "react"; 
import "../styles/styleEdit.css";

const EditKary = ({
  kary,
  handleUpdateKary,
  handleInputChange,
  handleCancelEdit,
}) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    handleUpdateKary();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edytuj kary pracowników</h2>
      <div className="table-responsive">
        <table className="table table-striped" style={{ fontSize: "9px" }}>
          <thead>
            <tr>
              <th scope="col" className="col">
                id_kary
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
                Rok
              </th>
              <th scope="col" className="col">
                Miesiąc
              </th>
              <th scope="col" className="col">
                Kwota kary
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input
                  type="number"
                  name="penalty_id"
                  value={kary.penalty_id}
                  onChange={handleInputChange}
                  readOnly
                  className="form-control small-font-input"
                />
              </td>
            
              <td>
                <input
                  type="number"
                  name="employee_id"
                  value={kary.employee_id}
                  readOnly
                  className="form-control small-font-input"
                />
              </td>
              <td>
                <input
                  type="text"
                  name="employee_first_name"
                  value={kary.employee_first_name}
                  readOnly
                  className="form-control small-font-input"
                />
              </td>
              <td>
                <input
                  type="text"
                  name="employee_last_name"
                  value={kary.employee_last_name}
                  readOnly
                  className="form-control small-font-input"
                />
              </td>
              <td>
                <input
                  type="text"
                  name="year"
                  value={kary.year}
                  onChange={handleInputChange}
                  required
                  className="form-control small-font-input"
                />
              </td>
              <td>
                <input
                  type="text"
                  name="month"
                  value={kary.month}
                  onChange={handleInputChange}
                  required
                  className="form-control small-font-input"
                />
              </td>
              <td>
                <input
                  type="text"
                  name="penalty_amount"
                  value={kary.penalty_amount}
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


export default EditKary;
