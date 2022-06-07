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
import Zelje from './pocetna/FormaZaZelje';
import VelikiBlog from './pocetna/VelikiBlog'
import NavbarTrener from './komponente/NavbarTrener';
import Tabela from './profil/Uprava/TabelaKorisnici';
import ZahteviTrenera from './profil/Trener/Zahtevi';
import TreninziTrenera from './profil/Trener/Treninzi';
import TaboviLevo from './komponente/TaboviLevo';
import KorisniciTrenera from './profil/Trener/Korisnici';

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
    <>    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Router>
        <ScrollToTop enableColorScheme />

        {(user && user.tip === 'Trener') ? (<NavbarTrener />) : <Navbar />}

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

          <Route path='/blog' element={<Blog />} />

          <Route path='/blog/:tag/:naslov' element={<VelikiBlog />} />


          <Route path='/login' element=
            {user ? <Navigate replace to="/profil" /> : <LogIn />}>
          </Route>

          <Route path='/signup' element=
            {user ? <Navigate replace to="/profil" /> : <Register />}>
          </Route>

          {/* <Route path='/signup' element={<Register />} /> */}

          <Route path='/registracija/podaci' element={<Zelje />} />

          <Route path='/profil' element=
            {!user ? <Navigate replace to="/pocetna" /> : <UserPocetna />}>
          </Route>

          {/* <Route path='/RDL/uprava/:username' element={<Uprava />} /> */}

          <Route path='/napredak' element={<Napredak />} />
          <Route path='/vasitreninzi' element={<ZakazaniTreninzi />} />

          <Route path='/grupnitreninzi' element={<GrupniTreninzi />} />

          {/* <Route path='/profil' element={<UserPocetna />} ></Route> */}

          <Route path='/RDL/trener/korisnici' element={<KorisniciTrenera/>} />
          <Route path='/RDL/trener/:username/zahtevi' element={<ZahteviTrenera />} />
          <Route path='/RDL/trener/:username/treninzi' element={<TreninziTrenera />} />


        </Routes>

        {/* <Footer /> */}
      </Router>
    </ThemeProvider >

    </>

  );
}

export default App;
