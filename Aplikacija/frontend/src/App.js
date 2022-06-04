import './App.css';
import { Header, Pocetna } from './pocetna/Pocetna';
import LogIn from './pocetna/LoginForma'
import Treneri from './pocetna/Treneri'
import Onama from './pocetna/ONama'
import Usluge from './pocetna/Usluge'
import Blog from './pocetna/Blog'
import Register from './pocetna/RegisterForma';
import ScrollToTop from './komponente/ScrollToTop';
import UserPocetna from './pocetna/UserPocetna';
import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { UserContext } from './context/UserContext';
import { CssBaseline } from '@mui/material';
import Navbar from './komponente/Navbar';
import Uprava from './profil/ProfilUprava'
import Footer from './komponente/Footer';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ZakazaniTreninzi from './profil/Korisnik/ZakazaniTreninzi';
import Napredak from './profil/Korisnik/Napredak';
import GrupniTreninzi from './pocetna/GrupniTreninzi';

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
          <Route path='/vasitreninzi' element={<ZakazaniTreninzi />} />

          <Route path='/grupnitreninzi' element={<GrupniTreninzi />} />

          {/* <Route path='/profil' element={<UserPocetna />} ></Route> */}

        </Routes>

        <Footer />
      </Router>
    </ThemeProvider>

  );
}

export default App;
