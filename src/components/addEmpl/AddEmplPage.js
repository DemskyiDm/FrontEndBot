import React, { useState } from "react";

const inputFields = [
  { name: "employee_passport_number", label: "Paszport" },
  { name: "employee_pesel", label: "pesel" },
  { name: "employee_first_name", label: "Imię" },
  { name: "employee_last_name", label: "Nazwisko" },
  { name: "employee_gender", label: "Płeć" },
  { name: "employee_position_id", label: "ID stanowiska" },
  { name: "position", label: "Stanowisko" },
  { name: "employee_status", label: "Status" },
  { name: "employee_accommodation_date", label: "Data zakwaterowania" },
  { name: "employee_training_date", label: "Data szkolenia" },
  {
    name: "employee_medical_certificate_date",
    label: "Data ważności zaświadczenia medycznego",
  },
  { name: "employee_entry_to_rp_date", label: "Data wjazdu na teren RP" },
  { name: "employee_legalization_document", label: "Dokument" },
  { name: "employee_legalization_document_expiry", label: "Ważność dokumentu" },
  { name: "employee_contract_start", label: "Data rozpoczęcia umowy" },
  { name: "employee_contract_end", label: "Data zakończenia umowy" },
  { name: "employee_phone", label: "Telefon" },
  { name: "employee_last_working_day", label: "Ostatni dzień pracy" },
  { name: "employee_departure_date", label: "Data odejścia" },
  { name: "employee_comments", label: "Komentarz" },
  { name: "employee_student_card_end", label: "Ważność legitymacji studenckiej" }
  //{ name: "employee_date_of_birth", label: "Data urodzenia" },
];

const AddEmplPage = ({ updateWorkerList }) => {
  const [formData, setFormData] = useState({
    employee_passport_number: "as123456",
    employee_pesel: "89012317357",
    employee_first_name: "Leon",
    employee_last_name: "Mike",
    employee_gender: "M",
    employee_position_id: "1",
    employee_position: "pracownik produkcyjny",
    employee_status: "pracuje",
    employee_accommodation_date: "2023-11-01",
    employee_training_date: "2023-11-01",
    employee_medical_certificate_date: "2023-11-01",
    employee_entry_to_rp_date: "2023-11-01",
    employee_legalization_document: "decyzja",
    employee_legalization_document_expiry: "2023-11-01",
    employee_contarct_start: "2023-11-01",
    employee_contract_end: "2023-11-01",
    employee_phone: "123456789",
    employee_last_working_day: "2023-11-01",
    employee_departure_date: "2023-11-01",
    employee_comments: "2023-11-01",
    employee_student_card_end: "2023-11-01"
    //employee_date_of_birth: "2023-11-01",
  });

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newWorker = formData;

    fetch("http://localhost:8080/addworkerbd", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newWorker),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Pracownik dodany:", data);
        window.location.href = 'http://localhost:3000/main';
        
      })
      .catch((error) => {
        console.error("Błąd przy dodanie pracownika:", error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Dodaj nowego pracownika</h2>
      <div className="table-responsive">
        <table className="table table-striped">
          <colgroup>
            <col
              style={{
                width: "calc(1/24 * 100vw)",
                minWidth: "50px",
                maxWidth: "calc(1/12 * 100vw)",
              }}
            />
            <col
              style={{
                width: "calc(1/6 * 100vw)",
                minWidth: "100px",
                maxWidth: "calc(1/12 * 100vw)",
              }}
            />
          </colgroup>

          <tbody>
            {inputFields.map((field, index) => (
              <tr key={field.name}>
                <td>{field.label}</td>
                <td>
                  {field.name === "employee_gender" ? (
                    <select
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleInputChange}
                      className="form-control"
                      required
                    >
                      <option value="">Wybierz plec</option>
                      <option value="male">M</option>
                      <option value="female">K</option>
                      <option value="other">Inne</option>
                    </select>
                  ) : field.name === "employee_position_id" ? (
                    <select
                      name={field.name}
                      value={formData[field.name]}
                      onChange={(event) => {
                        handleInputChange(event);

                        const newPosition =
                          event.target.value === "1"
                            ? "pracownik produkcyjny"
                            : event.target.value === "2"
                            ? "magazynier"
                            : formData.position;
                        setFormData((prevData) => ({
                          ...prevData,
                          position: newPosition,
                        }));
                      }}
                      className="form-control"
                      required
                    >
                      <option value="">Wybierz id</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </select>
                  ) : field.name === "employee_legalization_document" ? ( 
                    <select
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleInputChange}
                      className="form-control"
                    >
                      <option value="">Wybierz typ dokumentu</option>
                      <option value="osw">ośw</option>
                      <option value="osw-powrot">ośw-powrót</option>
                      <option value="czek">czeka na powiadomienie</option>
                      <option value="kpol">karta polaka</option>
                      <option value="dec">decyzja</option>
                      <option value="kp">karta pobytu</option>
                    </select>
                  ) : (
                    <input
                      type={
                        [
                          "employee_accommodation_date",
                          "employee_training_date",
                          "employee_medical_certificate_date",
                          "employee_entry_to_rp_date",
                          "employee_legalization_document_expiry",
                          "employee_contract_start",
                          "employee_contract_end",
                          "employee_last_day",
                          "employee_departure_date",
                          "employee_student_card_end"
                         // "employee_date_of_birth",
                        ].includes(field.name)
                          ? "date"
                          : "text"
                      }
                      name={field.name}
                      value={
                        field.name === "status"
                          ? "pracuje"
                          : formData[field.name]
                      }
                      onChange={handleInputChange}
                      className="form-control"
                      disabled={field.name === "status"}
                      {...(inputFields.indexOf(field) < 8 && {
                      //  required: true,
                      })}
                    />
                  )}{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="text-center">
        <button type="submit" className="btn btn-success">
          Dodaj osobę
        </button>
      </div>
      <a href="#" className="center-link" onClick={() => window.history.back()}>
        Powrót na ekran startowy
      </a>
    </form>
  );
};

export default AddEmplPage;
