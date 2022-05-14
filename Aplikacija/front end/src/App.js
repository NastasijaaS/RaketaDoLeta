import './App.css';
import { Header, Footer, Pocetna } from './components/Pocetna';
import LogIn from './components/LoginForma'
import Treneri from './components/Treneri'
import Onama from './components/ONama';
import React, { Fragment } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {

  return (
    <Router>
      <Header />

      <Routes>
        <Route path='/' element = {<Pocetna/>}>
        </Route>

        <Route path='/treneri' element={<Treneri />}>
        </Route>

        <Route path='/onama' element = { <Onama/>}>
        </Route>

        <Route path='/treninzi'>
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
