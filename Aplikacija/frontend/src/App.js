import './App.css';
import { Header, Footer, Pocetna } from './components/Pocetna';
import LogIn from './components/LoginForma'
import Treneri from './components/Treneri'
import Onama from './components/ONama'
import Usluge from './components/Usluge'
import ScrollToTop from './components/ScrollToTop';
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {

  return (
    <Router>
      <ScrollToTop />
      <Header />

      <Routes>

        <Route path='/' element={<Pocetna />}>
        </Route>

        <Route path='/pocetna' element={<Pocetna />}>
        </Route>

        <Route path='/treneri' element={<Treneri />}>
        </Route>

        <Route path='/onama' element={<Onama />}>
        </Route>

        <Route path='/usluge' element={<Usluge />}>
        </Route>

        <Route path='/login' element={<LogIn prijava='false' />}>
        </Route>

        <Route path='/signup' element={<LogIn prijava='true' />}>
        </Route>

      </Routes>

      <Footer />
    </Router>

  );
}

export default App;
