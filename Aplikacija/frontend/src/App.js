import './App.css';
import { Header, Footer, Pocetna } from './components/Pocetna';
import LogIn from './components/LoginForma'
import Treneri from './components/Treneri'
import Onama from './components/ONama'
import Usluge from './components/Usluge'
import Blog from './components/Blog'
import Register from './components/RegisterForma';
import ScrollToTop from './components/ScrollToTop';
import UserPocetna from './components/UserPocetna';
import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { UserContext } from './context/UserContext';

function App() {

  const { user } = useContext(UserContext);

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
