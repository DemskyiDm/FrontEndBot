import React, { useState, useEffect } from "react";
import "../styles/styleEdit.css";
import EditAdresPage from "./AdresPage";

const ChangeAdresWorker = (props) => {
  const [adressList, setAddressList] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [isModalAdresOpen, setIsModalAdresOpen] = useState(false);

  const handleInputChangeNew = (event) => {
    setSelectedAddress({
      ...selectedAddress,
      [event.target.name]: event.target.value,
    });
  };
  const onSaveAddress = (address) => {
    setSelectedAddress(address);
    console.log(address);
  };
  const handleAdresClick = (selectedAdres) => {
    onSaveAddress(selectedAdres);
    closeAdresModal();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newAdresWorker = {
      employee_id: props.worker.employee_id,
      adres: {
        residence_address_id: selectedAddress.residence_address_id,
      },
      start_date: props.worker.start_date, 
      end_date: props.worker.end_date, 
    };
    console.log(newAdresWorker);
    fetch("http://localhost:8080/workersAddAdres", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newAdresWorker),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("AdresPracownik dodany:", data);
        // window.location.href = "http://localhost:3000/main";
      })
      .catch((error) => {
        console.error("Błąd przy dodanie adresy pracownika:", error);
      });
    props.handleUpdateWorker();
    props.closeChangeModal();
  };

  const openAdresModal = () => {
    setSelectedAddress("");
    setIsModalAdresOpen(true);
  };

  const closeAdresModal = () => {
    setIsModalAdresOpen(false);
  };

  useEffect(() => {
    fetch("http://localhost:8080/alladreslist")
      .then((response) => response.json())
      .then((data) => {
        setAddressList(data);
      })
      .catch((error) => {
        console.error("Помилка при отриманні списку адрес: ", error);
      });
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edytuj adres pracownika</h2>

      <div className="table-responsive">
        <table className="table table-striped" style={{ fontSize: "11px" }}>
          <thead>
            <tr>
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
                  name="employee_id"
                  value={props.worker.employee_id}
                  readOnly
                  className="form-control small-font-input"
                />
              </td>
              <td>
                <input
                  type="text"
                  name="employee_last_name"
                  value={props.worker.employee_last_name}
                  readOnly
                  className="form-control small-font-input"
                />
              </td>
              <td>
                <input
                  type="text"
                  name="employee_first_name"
                  value={props.worker.employee_first_name}
                  readOnly
                  className="form-control small-font-input"
                />
              </td>
              <td>
                <input
                  type="text"
                  name="residence_city"
                  value={selectedAddress.residence_city}
                  onChange={handleInputChangeNew}
                  className="form-control small-font-input"
                />
              </td>
              <td>
                <input
                  type="text"
                  name="residence_street"
                  value={selectedAddress.residence_street}
                  onChange={handleInputChangeNew}
                  className="form-control small-font-input"
                />
              </td>
              <td>
                <input
                  type="text"
                  name="residence_home"
                  value={selectedAddress.residence_home}
                  onChange={handleInputChangeNew}
                  className="form-control small-font-input"
                />
              </td>
              <td>
                <input
                  name="residence_flat"
                  value={selectedAddress.residence_flat}
                  onChange={handleInputChangeNew}
                  className="form-control small-font-input"
                />
              </td>
              <td>
                <input
                  type="text"
                  name="residence_room"
                  value={selectedAddress.residence_room}
                  onChange={handleInputChangeNew}
                  className="form-control small-font-input"
                />
              </td>
              <td>
                <input
                  type="date"
                  name="start_date"
                  value={props.worker.start_date}
                  onChange={props.handleInputChange}
                  className="form-control small-font-input"
                />
              </td>
              <td>
                <input
                  type="date"
                  name="end_date"
                  value={props.worker.end_date}
                  onChange={props.handleInputChange}
                  className="form-control small-font-input"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <button
        type="button"
        onClick={openAdresModal}
        className="btn btn-primary"
      >
        Dodaj adres
      </button>
      <button type="submit" className="btn btn-primary">
        Zapisz zmiany
      </button>
      <button
        type="button"
        className="btn btn-secondary"
        onClick={props.handleCancelEdit}
      >
        Anuluj
      </button>
      {isModalAdresOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeAdresModal}>
              &times;
            </span>
            <EditAdresPage
              onSaveAddress={props.onSaveAddress}
              selectedAddress={selectedAddress}
              handleAdresClick={handleAdresClick}
            />
          </div>
        </div>
      )}
    </form>
  );
};

export default ChangeAdresWorker;
