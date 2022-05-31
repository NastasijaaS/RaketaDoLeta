import './App.css';
import { Header, Footer, Pocetna } from './components/pocetna/Pocetna';
import LogIn from './components/pocetna/LoginForma'
import Treneri from './components/pocetna/Treneri'
import Onama from './components/pocetna/ONama'
import Usluge from './components/pocetna/Usluge'
import Blog from './components/pocetna/Blog'
import Register from './components/pocetna/RegisterForma';
import ScrollToTop from './components/ScrollToTop';
import UserPocetna from './components/pocetna/UserPocetna';
import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { UserContext } from './context/UserContext';
import { CssBaseline } from '@mui/material';
import Navbar from './components/Navbar';

function App() {

  const { user } = useContext(UserContext);
  
  return (
    <Router>
      <CssBaseline />
      <ScrollToTop enableColorScheme />
      <Navbar />

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

        <Route path='/blog' element={<Blog />}>
        </Route>

        <Route path='/login' element=
          {user ? <Navigate replace to="/profil" /> : <LogIn />}>
        </Route>

        <Route path='/signup' element=
          {user ? <Navigate replace to="/profil" /> : <Register />}>
        </Route>

        <Route path='/profil' element=
          {!user ? <Navigate replace to="/pocetna" /> : <UserPocetna />}>
        </Route>

        {/* <Route path='/profil' element={<UserPocetna />} ></Route> */}

      </Routes>

      <Footer />
    </Router>

  );
}

export default App;
