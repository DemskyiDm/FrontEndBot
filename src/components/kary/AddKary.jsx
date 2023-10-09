import React, { useState, useEffect } from "react";
import WorkerPage from "../modules/WorkerPage";
import "../styles/styleEdit.css";
 
const AddKary = (props) => {
  const [karyList, setKaryList] = useState("");
  const [selectedWorker, setSelectedWorker] = useState("");
  const [isModalWorkerOpen, setIsModalWorkerOpen] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    handleAddKary();
  };

  const handleEmployeeIdChange = (event) => {
    const { name, value } = event.target;
    setSelectedWorker({
      ...selectedWorker,
      [name]: value,
    });
  };
  const onSaveWorker = (dataWorker) => {
    setSelectedWorker(dataWorker);
    console.log(dataWorker);
    closeWorkerModal();
  };

  const openWorkerModal = () => {
    setSelectedWorker("");
    setIsModalWorkerOpen(true);
  };

  const closeWorkerModal = () => {
    setIsModalWorkerOpen(false);
  };

  const handleAddKary = () => {
    const nowaKara = {
      employee_id: selectedWorker.employee_id,
      year: props.newKary.year,
      month: props.newKary.month,
      penalty_amount: props.newKary.penalty_amount,
    };
    fetch("http://localhost:8080/addkary", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(nowaKara),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Kara dodana:", data);
        props.updateKaryList();
        setIsModalWorkerOpen(false);
        props.setIsAddModalOpen(false);
        setSelectedWorker("");
        props.setNewKary("");
      })
      .catch((error) => {
        console.error("Błąd przy dodanie pracownika:", error);
      });
  };

  useEffect(() => {
    fetch("http://localhost:8080/workerlist")
      .then((response) => response.json())
      .then((data) => {
        setKaryList(data);
      })
      .catch((error) => {
        console.error("Błąd w trakcie otrzymania listy pracowników: ", error);
      });
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <h2>Dodaj kary dla pracownika</h2>
      <div className="table-responsive">
        <table className="table table-striped" style={{ fontSize: "9px" }}>
          <thead>
            <tr>
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
                  name="employee_id"
                  value={selectedWorker.employee_id}
                  onChange={handleEmployeeIdChange}
                  required
                  className="form-control small-font-input"
                />
              </td>
              <td>
                <input
                  type="text"
                  name="employee_first_name"
                  value={selectedWorker.employee_first_name}
                  onChange={props.handleInputChange}
                  className="form-control small-font-input"
                />
              </td>
              <td>
                <input
                  type="text"
                  name="employee_last_name"
                  value={selectedWorker.employee_last_name}
                  onChange={props.handleInputChange}
                  className="form-control small-font-input"
                />
              </td>
              <td>
                <input
                  type="text"
                  name="year"
                  value={props.newKary.year}
                  onChange={props.handleInputChange}
                  required
                  className="form-control small-font-input"
                />
              </td>
              <td>
                <input
                  type="text"
                  name="month"
                  value={props.newKary.month}
                  onChange={props.handleInputChange}
                  required
                  className="form-control small-font-input"
                />
              </td>
              <td>
                <input
                  type="text"
                  name="penalty_amount"
                  value={props.newKary.penalty_amount}
                  onChange={props.handleInputChange}
                  required
                  className="form-control small-font-input"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <button
        type="button"
        onClick={openWorkerModal}
        className="btn btn-primary"
      >
        Wybierz pracownika
      </button>
      <button type="submit" className="btn btn-primary">
        Zapisz zmiany
      </button>
      <button
        type="button"
        className="btn btn-secondary"
        onClick={props.handleAddCancelEdit}
      >
        Anuluj
      </button>
      {isModalWorkerOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeWorkerModal}>
              &times;
            </span>
            <WorkerPage
              onSaveWorker={onSaveWorker}
              selectedWorker={selectedWorker}
            />
          </div>
        </div>
      )}
    </form>
  );
};
export default AddKary;
