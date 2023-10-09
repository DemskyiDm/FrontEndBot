import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import LoginForm from './components/LoginForm/LoginForm';
import AddEmplPage from './components/addEmpl/AddEmplPage';
import EditAmpPage from './components/editEmpl/EditAmpPage';
import EditEmplAdres from './components/adres/EditEmplAdresPage';
import BazaZaliczekPage from './components/zaliczki/bazaZaliczekPage';
import BazaPotrPage from './components/potracenia/bazaPotrPage';
import BazaKaryPage from './components/kary/bazaKaryPage';
import KosztZakwaterowania from './components/kosztZakwaterowania/KosztyZakwwaterowaniaPage';
import BazaWorkHours from './components/workHours/bazaWorkHours';
import AddEmplPageCopy from './AddEmplPageCopy';
import Salary from './components/salary/SalaryPage';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<LoginForm/>} /> 
        <Route path='/main' element={<MainPage/>} />
        <Route path='/addemployee' element={<AddEmplPage/>} />
        <Route path='/editemployee' element={<EditAmpPage/>} />
        <Route path='/EditEmplAdres' element={<EditEmplAdres/>} />
        <Route path='/bazzal' element={<BazaZaliczekPage/>} />
        <Route path='/bazpotr' element={<BazaPotrPage/>} />
        <Route path='/bazkar' element={<BazaKaryPage/>} />
        <Route path='/koszak' element={<KosztZakwaterowania/>} />
        <Route path='/wh' element={<BazaWorkHours/>} />
        <Route path='/Salary' element={<Salary/>} />
        
        <Route path='/addemployeeCopy' element={<AddEmplPageCopy/>} />
      </Routes>
    </Router>
  );  
};

export default App;
