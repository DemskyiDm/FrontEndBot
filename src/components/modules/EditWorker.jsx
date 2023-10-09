import React from "react";
import "../styles/styleEdit.css";

const EditWorker = ({
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
      <h2>Edytuj pracownika</h2>
      <div className="table-responsive">
        <table className="table table-striped" style={{ fontSize: "9px" }}>
          <thead>
            <tr>
              <th scope="col" className="col">
                id
              </th>
              <th scope="col" className="col">
                Paszport
              </th>
              <th scope="col" className="col">
                Pesel
              </th>
              <th scope="col" className="col">
                Imię
              </th>
              <th scope="col" className="col">
                Nazwisko
              </th>
              <th scope="col" className="col">
                Płeć
              </th>
              <th scope="col" className="col">
                ID stanowiska
              </th>
              <th scope="col" className="col">
                Stanowisko
              </th>
              <th scope="col" className="col">
                Status
              </th>
              <th scope="col" className="col">
                Data zakwate rowania
              </th>
              <th scope="col" className="col">
                Data szkolenia
              </th>
              <th scope="col" className="col">
                Data ważności zaświadczenia medycznego
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
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
                  name="employee_passport_number"
                  value={worker.employee_passport_number}
                  onChange={handleInputChange}
                  required
                  className="form-control small-font-input"
                />
              </td>
              <td>
                <input
                  type="text"
                  name="employee_pesel"
                  value={worker.employee_pesel}
                  onChange={handleInputChange}
                  required
                  className="form-control small-font-input"
                />
              </td>
              <td>
                <input
                  type="text"
                  name="employee_last_name"
                  value={worker.employee_last_name}
                  onChange={handleInputChange}
                  required
                  className="form-control small-font-input"
                />
              </td>
              <td>
                <input
                  type="text"
                  name="employee_first_name"
                  value={worker.employee_first_name}
                  onChange={handleInputChange}
                  required
                  className="form-control small-font-input"
                />
              </td>
              <td>
              <select
                  type="text"
                  name="employee_gender"
                  value={worker.employee_gender}
                  onChange={handleInputChange}
                  required
                  className="form-control small-font-input"
                >
                   <option value="M">M</option>
                  <option value="K">K</option>
                </select>
              </td>
              <td>
                <select
                  name="employee_position_id"
                  value={worker.employee_position_id}
                  onChange={handleInputChange} 
                  required
                  className="form-control small-font-input"
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                </select>
              </td>
              <td>
                <input
                  type="text"
                  name="employee_position"
                  value={
                    worker.employee_position_id === "1"
                      ? "pracownik produkcyjny"
                      : worker.employee_position_id === "2"
                      ? "magazynier"
                      : worker.employee_position
                  }
                  readOnly 
                  className="form-control small-font-input"
                />
              </td>
           
              <td>
              <select
                  type="text"
                  name="employee_status"
                  value={worker.employee_status}
                  onChange={handleInputChange}
                  required
                  className="form-control small-font-input"
                  >
                  <option value="pracue">pracuje</option>
                  <option value="urlop">urlop</option>
                  <option value="chorobowy">chorobowy</option>
                  <option value="zwolniony">zwolniony</option>
                </select>
              </td>
              <td>
                <input
                  type="date"
                  name="employee_accommodation_date"
                  value={worker.employee_accommodation_date}
                  onChange={handleInputChange}
                  required
                  className="form-control small-font-input"
                />
              </td>
              <td>
                <input
                  type="date"
                  name="employee_training_date"
                  value={worker.employee_training_date}
                  onChange={handleInputChange}
                  required
                  className="form-control small-font-input"
                />
              </td>
              <td>
                <input
                  type="date"
                  name="employee_medical_certificate_date"
                  value={worker.employee_medical_certificate_date}
                  onChange={handleInputChange}
                  className="form-control small-font-input"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="table-responsive">
        <table className="table table-striped" style={{ fontSize: "9px" }}>
          <thead>
            <tr>
              <th scope="col" className="col">
                Data wjazdu na teren RP
              </th>
              <th scope="col" className="col">
                Dokument
              </th>
              <th scope="col" className="col">
                Dokument legalizacyjny
              </th>
              <th scope="col" className="col">
                Ważność dokumentu
              </th>
              <th scope="col" className="col">
                Data rozpoczęcia umowy
              </th>
              <th scope="col" className="col">
                Data zakończenia umowy
              </th>
              <th scope="col" className="col">
                Telefon
              </th>
              <th scope="col" className="col">
                Ostatni dzień pracy
              </th>
              <th scope="col" className="col">
                Data odejścia
              </th>
              <th scope="col" className="col">
                Komentarz
              </th>
              <th scope="col" className="col">
                Ważność legitymacji studenckiej
              </th>
              <th scope="col" className="col">
                Data urodzenia
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input
                  type="date"
                  name="employee_entry_to_rp_date"
                  value={worker.employee_entry_to_rp_date}
                  onChange={handleInputChange}
                  required
                  className="form-control small-font-input"
                />
              </td>
              <td>
                <select
                  type="text"
                  name="employee_document_type"
                  value={worker.employee_document_type}
                  onChange={handleInputChange}
                  required
                  className="form-control small-font-input"
                >
                  <option value="ośw">ośw</option>
                  <option value="zezw">zezw</option>
                  <option value="decyzja">decyzja</option>
                  <option value="karta polaka">karta polaka</option>
                  <option value="karta pobytu">karta pobytu</option>
                  <option value="ośw-powrót">ośw-powrót</option>
                  <option value="powiadomienie">powiadomienie</option>
                  <option value="czeka na powiadomienie">czeka na powiadomienie</option>
                </select>
              </td>
              <td>
                <select
                  type="text"
                  name="employee_legalization_document"
                  value={worker.employee_legalization_document}
                  onChange={handleInputChange}
                  required
                  className="form-control small-font-input"
                > 
                <option value="wiza">wiza</option>
                <option value="wiza+BIO">wiza+BIO</option>
                <option value="BIO">BIO</option>
                <option value="pieczątka">pieczątka</option>
                <option value="karta pobytu">karta pobytu</option>
                <option value="karta polaka">karta polaka</option>
                <option value="BIO po 13.03">BIO po 13.03</option>
                <option value="ukr paszport">ukr paszport</option>
              </select>
              </td>
              <td>
                <input
                  type="date"
                  name="employee_legalization_document_expiry"
                  value={worker.employee_legalization_document_expiry}
                  onChange={handleInputChange}
                  required
                  className="form-control small-font-input"
                />
              </td>
              <td>
                <input
                  type="date"
                  name="employee_contract_start"
                  value={worker.employee_contract_start}
                  onChange={handleInputChange}
                  required
                  className="form-control small-font-input"
                />
              </td>
              <td>
                <input
                  type="date"
                  name="employee_contract_end"
                  value={worker.employee_contract_end}
                  onChange={handleInputChange}
                  required
                  className="form-control small-font-input"
                />
              </td>
              <td>
                <input
                  type="text"
                  name="employee_phone"
                  value={worker.employee_phone}
                  onChange={handleInputChange}
                  className="form-control small-font-input"
                />
              </td>
              <td>
                <input
                  type="date"
                  name="employee_last_working_day"
                  value={worker.employee_last_working_day}
                  onChange={handleInputChange}
                  className="form-control small-font-input"
                />
              </td>
              <td>
                <input
                  type="date"
                  name="employee_departure_date"
                  value={worker.employee_departure_date}
                  onChange={handleInputChange}
                  className="form-control small-font-input"
                />
              </td>
              <td>
                <input
                  type="text"
                  name="employee_comments"
                  value={worker.employee_comments}
                  onChange={handleInputChange}
                  className="form-control small-font-input"
                />
              </td>
              <td>
                <input
                  type="date"
                  name="employee_student_card_end"
                  value={worker.employee_student_card_end}
                  onChange={handleInputChange}
                  className="form-control small-font-input"
                />
              </td>
              <td>
                <input
                  type="text"
                  name="employee_date_of_birth"
                  value={worker.employee_date_of_birth}
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

export default EditWorker;
