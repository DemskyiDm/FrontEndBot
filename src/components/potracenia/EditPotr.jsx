import React, { useState } from "react";
import "../styles/styleEdit.css";

const EditPotr = ({
  potracenia,
  handleUpdatePotracenia,
  handleInputChange,
  handleCancelEdit,
}) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    handleUpdatePotracenia();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edytuj potrącenia pracowników</h2>
      <div className="table-responsive">
        <table className="table table-striped" style={{ fontSize: "9px" }}>
          <thead>
            <tr>
              <th scope="col" className="col">
                id_potrącenia
              </th>
              <th scope="col" className="col">
                Data potrącenia
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
                Kwota potrącenia
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input
                  type="number"
                  name="dedustions_id"
                  value={potracenia.dedustions_id}
                  onChange={handleInputChange}
                  readOnly
                  className="form-control small-font-input"
                />
              </td>
              <td>
                <input
                  type="date"
                  name="dedutcions_date"
                  value={potracenia.dedutcions_date}
                  onChange={handleInputChange}
                  required
                  className="form-control small-font-input"
                />
              </td>
              <td>
                <input
                  type="number"
                  name="employee_id"
                  value={potracenia.employee_id}
                  readOnly
                  className="form-control small-font-input"
                />
              </td>
              <td>
                <input
                  type="text"
                  name="employee_first_name"
                  value={potracenia.employee_first_name}
                  readOnly
                  className="form-control small-font-input"
                />
              </td>
              <td>
                <input
                  type="text"
                  name="employee_last_name"
                  value={potracenia.employee_last_name}
                  readOnly
                  className="form-control small-font-input"
                />
              </td>
              <td>
                <input
                  type="text"
                  name="year"
                  value={potracenia.year}
                  onChange={handleInputChange}
                  required
                  className="form-control small-font-input"
                />
              </td>
              <td>
                <input
                  type="text"
                  name="month"
                  value={potracenia.month}
                  onChange={handleInputChange}
                  required
                  className="form-control small-font-input"
                />
              </td>
              <td>
                <input
                  type="text"
                  name="amount"
                  value={potracenia.amount}
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

export default EditPotr;
