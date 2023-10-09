import React, { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import "./components/styles/styleMain.css";
import "bootstrap/dist/css/bootstrap.min.css";

const getUserRole = () => {
  const token = localStorage.getItem("jwtToken");
  if (token) {
    const decodedToken = jwtDecode(token);
    return decodedToken.role;
  }
  return "guest";
};

const getOptionsForRole = (role) => {
  switch (role) {
    case "admin":
      return [
        "addEmployee",
        "editEmployee",
        "EditEmplAdres",
        "avanse",
        "potracenia",
        "kary",
        "kwatery",
        "godz",
        "salary",
      ];
    case "koor":
      return ["editEmployee", "EditEmplAdres", "kwatery", "godz"];
    case "finansy":
      return ["avanse", "potracenia", "kary", "kwatery", "godz", "salary"];
    case "administracja":
      return ["EditEmplAdres", "kwatery"];
    default:
      return [];
  }
};

const MainPage = () => {
  const [userRole, setUserRole] = useState("");

  const addEmployee = () => {
    window.location.href = "http://localhost:3000/addemployee";
  };

  const editEmployee = () => {
    window.location.href = "http://localhost:3000/editemployee";
  };

  const editEmplAdres = () => {
    window.location.href = "http://localhost:3000/EditEmplAdres";
  };
  const dbZaliczek = () => {
    window.location.href = "http://localhost:3000/bazzal";
  };
  const dbPotr = () => {
    window.location.href = "http://localhost:3000/bazpotr";
  };
  const dbKary = () => {
    window.location.href = "http://localhost:3000/bazkar";
  };
  const dbKosztZakwat = () => {
    window.location.href = "http://localhost:3000/koszak";
  };
  const dbWorkHours = () => {
    window.location.href = "http://localhost:3000/wh";
  };
  const dbSalary = () => {
    window.location.href = "http://localhost:3000/salary";
  };


  useEffect(() => {
    const token = localStorage.getItem("jwtToken");

    if (token) {
      const decodedToken = jwtDecode(token);
      const role = decodedToken.role;
      setUserRole(role);
    }
  }, []);

  const [activeButtons, setActiveButtons] = useState([]);

  useEffect(() => {
    const userRole = getUserRole();
    const activeButtonsForRole = getOptionsForRole(userRole);

    setActiveButtons(activeButtonsForRole);
  }, []);

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>
        Witam w paneli administrowania i zarządzania pracownikami
      </h1>

      <div className="row">
        <div className="container">
          <div className="button-effect d-flex justify-content-center align-items-center">
            {activeButtons.includes("addEmployee") && (
              <button className="effect effect-3" onClick={addEmployee}>
                <div>Dodać pracownika</div>
              </button>
            )}
            {activeButtons.includes("editEmployee") && (
              <button className="effect effect-3" onClick={editEmployee}>
                <div>Edytuj dane pracownika</div>
              </button>
            )}
            {activeButtons.includes("EditEmplAdres") && (
              <button className="effect effect-3" onClick={editEmplAdres}>
                <div> Zmiana miejsca zamieszkania</div>
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="row">
        <div className="container">
          <div className="button-effect d-flex justify-content-center align-items-center">
            {activeButtons.includes("avanse") && (
              <button className="effect effect-3" onClick={dbZaliczek}>
                <div>Baza zaliczek</div>
              </button>
            )}
            {activeButtons.includes("potracenia") && (
              <button className="effect effect-3" onClick={dbPotr}>
                <div>Potrącenia pracowników</div>
              </button>
            )}
            {activeButtons.includes("kary") && (
              <button className="effect effect-3"  onClick={dbKary}>
                <div> Wprowadzenie kar</div>
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="row">
        <div className="container">
          <div className="button-effect d-flex justify-content-center align-items-center">
            {activeButtons.includes("kwatery") && (
              <button className="effect effect-3"  onClick={dbKosztZakwat}>
                <div>Koszty zakwaterowania</div>
              </button>
            )}

            {activeButtons.includes("godz") && (
              <button className="effect effect-3" onClick={dbWorkHours}>
                <div>Analiz godzin pracy</div> 
              </button>
            )}
            {activeButtons.includes("salary") && (
              <button className="effect effect-3"  onClick={dbSalary}>
                <div> Wynagrodzenia</div>
              </button>
            )}
          </div>
        </div>
      </div>
      <a
        href="http://localhost:3000/"
        className="center-link"
        onClick={() => localStorage.clear()}
      >
        Wylogować się
      </a>
    </div>
  );
};

export default MainPage;
