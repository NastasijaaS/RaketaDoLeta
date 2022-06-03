import './App.css';
import { Header, Pocetna } from './components/pocetna/Pocetna';
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
import Navbar from './components/komponente/Navbar';
import Uprava from './components/profil/ProfilUprava'
import Footer from './components/komponente/Footer';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ZakazaniTreninzi from './components/profil/Korisnik/ZakazaniTreninzi';
import Napredak from './components/profil/Korisnik/Napredak';

const darkTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#f8af00',
    },
    secondary: {
      main: '#004af8',
    },
    error: {
      main: '#f83200',
    },
  },
});


function App() {

  const { user } = useContext(UserContext);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Router>
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

          <Route path='/uprava' element={<Uprava />} />

          <Route path='/napredak' element={<Napredak />} />
          <Route path='/treninzi' element={<ZakazaniTreninzi />} />



          {/* <Route path='/profil' element={<UserPocetna />} ></Route> */}

        </Routes>

        <Footer />
      </Router>
    </ThemeProvider>

  );
}

export default App;
