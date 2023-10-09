import React from "react";
import "../styles/styleEdit.css";

const EditAdresWorker = ({
  worker,
  handleUpdateWorker,
  handleInputChange,
  handleCancelEdit,
}) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    handleUpdateWorker();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edytuj daty zamieszkania pracownika</h2>
      <div className="table-responsive">
        <table className="table table-striped" style={{ fontSize: "9px" }}>
          <thead>
            <tr>
              <th scope="col" className="col">
                id
              </th>
              <th scope="col" className="col">
                id pracownika
              </th>
              <th scope="col" className="col">
                LastName
              </th>
              <th scope="col" className="col">
                firstName
              </th>
              <th scope="col" className="col">
                miasto
              </th>
              <th scope="col" className="col">
                Ulica
              </th>
              <th scope="col" className="col">
                numer Domu
              </th>
              <th scope="col" className="col">
                numer mieszkania
              </th>
              <th scope="col" className="col">
                numer pokoju
              </th>
              <th scope="col" className="col">
                Data początku zakwaterowania
              </th>
              <th scope="col" className="col">
                Data zakończenia zakwaterowania
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input
                  type="number"
                  name="employee_address_id"
                  value={worker.employee_address_id}
                  readOnly
                  className="form-control small-font-input"
                />
              </td>
              <td>
                <input
                  type="number"
                  name="employee_id"
                  value={worker.employee_id}
                  readOnly
                  className="form-control small-font-input"
                />
              </td>
              <td>
                <input
                  type="text"
                  name="employee_last_name"
                  value={worker.employee_last_name}
                  readOnly
                  className="form-control small-font-input"
                />
              </td>
              <td>
                <input
                  type="text"
                  name="employee_first_namel"
                  value={worker.employee_first_name}
                  readOnly
                  className="form-control small-font-input"
                />
              </td>
              <td>
                <input
                  type="text"
                  name="residence_city"
                  value={worker.residence_city}
                  readOnly
                  className="form-control small-font-input"
                />
              </td>
              <td>
                <input
                  type="text"
                  name="residence_street"
                  value={worker.residence_street}
                  readOnly
                  className="form-control small-font-input"
                />
              </td>
              <td>
                <input
                  type="text"
                  name="residence_home"
                  value={worker.residence_home}
                  readOnly
                  className="form-control small-font-input"
                />
              </td>
              <td>
                <input
                  name="residence_flat"
                  value={worker.residence_flat}
                  readOnly
                  className="form-control small-font-input"
                />
              </td>
              <td>
                <input
                  type="text"
                  name="residence_room"
                  value={worker.residence_room}
                  readOnly
                  className="form-control small-font-input"
                />
              </td>
              <td>
                <input
                  type="date"
                  name="start_date"
                  value={worker.start_date}
                  onChange={handleInputChange}
                  required
                  className="form-control small-font-input"
                />
              </td>
              <td>
                <input
                  type="date"
                  name="end_date"
                  value={worker.end_date}
                  onChange={handleInputChange}
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

export default EditAdresWorker;
