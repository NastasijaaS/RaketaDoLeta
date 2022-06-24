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
import React, { createContext, useContext, useMemo, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, NavigationType } from "react-router-dom";
import { UserContext } from './context/UserContext';
import { CssBaseline, IconButton } from '@mui/material';
import Navbar from './komponente/Navbar';
import Uprava from './profil/ProfilUprava'
import Footer from './komponente/Footer';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
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
import NavbarUprava from './komponente/NavbarUprava';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import KorisnikVeliko from './profil/Trener/KorisnikVeliko'
import OdbijeniTreninzi from './profil/Trener/OdbijeniTreninzi';
import useMediaQuery from '@mui/material/useMediaQuery';
import Fab from '@mui/material/Fab';


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#f8af00',
    },
    secondary: {
      main: '#f8af00',
    },
    error: {
      main: '#f83200',
    },
  },
});

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#f8af00',
    },
    secondary: {
      main: '#000000',
    },
    error: {
      main: '#f83200',
    },
  },
});
const fabStyle = {
  position: 'absolute',
  bottom: 16,
  right: 16,
};

const ColorModeContext = createContext({ toggleColorMode: () => { } });

function App() {

  const { user } = useContext(UserContext);

  const prefersDarkMode = window.matchMedia && window.matchMedia('refers-color-scheme: dark').matches
  //useMediaQuery('(prefers-color-scheme: dark)');

  if (!sessionStorage.getItem('tema')) {
    sessionStorage.setItem('tema', prefersDarkMode ? 'dark' : 'light')
  }

  const t = sessionStorage.getItem('tema')
  const [mode, setMode] = useState(t ? t : 'light');

  const toggleColorMode = () => {
    setMode(mode === 'light' ? 'dark' : 'light')
    sessionStorage.setItem('tema', mode === 'light' ? 'dark' : 'light')
  }

  const theme = mode === 'light' ? darkTheme : lightTheme

  // createTheme({
  //   palette: {
  //     mode,
  //   },
  // })

  // useMemo(
  //   () =>
  //     createTheme({
  //       palette: {
  //         mode,
  //       },
  //     }),
  //   [mode],
  // );


  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <ScrollToTop enableColorScheme />

          {/* <div >{theme.palette.mode} mode
            <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
              <Brightness7Icon />
            </IconButton></div> */}

          {/* <Navbar check={mode} change={() => setMode(!mode)} /> */}
          {
            (user && user.tip === 'Uprava' && <NavbarUprava />)
            ||
            ((user && user.tip === 'Trener') ? (<NavbarTrener />) : <Navbar check={mode} change={() => setMode(!mode)} />)
          }


          <Routes>

            <Route path='/' element={<Pocetna />} />

            <Route path='/pocetna' element={<Pocetna />} />

            <Route path='/treneri' element={<Treneri />} />

            <Route path='/onama' element={<Onama />} />

            <Route path='/usluge' element={<Usluge />} />

            <Route path='/blog' element={<Blog />} />

            <Route path='/blog/:tag/:naslov' element={<VelikiBlog />} />

            <Route path='/login' element=
              {user ? <Navigate replace to="/profil" /> : <LogIn />} />


            <Route path='/signup' element=
              {user ? <Navigate replace to="/profil" /> : <Register />} />

            {/* <Route path='/signup' element={<Register />} /> */}

            <Route path='/registracija/podaci' element={<Zelje />} />

            <Route path='/profil' element=
              {!user ? <Navigate replace to="/pocetna" /> : <UserPocetna />} />

            {/* <Route path='/RDL/uprava/:username' element={<Uprava />} /> */}

            <Route path='/napredak' element={<Napredak />} />
            <Route path='/vasitreninzi' element={<ZakazaniTreninzi />} />

            <Route path='/grupnitreninzi' element={<GrupniTreninzi />} />

            {/* <Route path='/profil' element={<UserPocetna />} ></Route> */}

            { }
            <Route path='/RDL/trener/korisnici'
              element={user && user.tip === 'Trener' ?
                <KorisniciTrenera /> : <Navigate replace to="/pocetna" />} />

            <Route path='/RDL/trener/:username/zahtevi'
              element={user && user.tip === 'Trener' ?
                <ZahteviTrenera /> : <Navigate replace to="/pocetna" />} />

            <Route path='/RDL/trener/:username/treninzi'
              element={user && user.tip === 'Trener' ?
                <TreninziTrenera /> : <Navigate replace to="/pocetna" />} />

            <Route path='/trener/korisnik/:ime'
              element={user && user.tip === 'Trener' ?
                <KorisnikVeliko /> : <Navigate replace to="/pocetna" />} />

            <Route path='/RDL/trener/odbijenizahtevi'
              element={user && user.tip === 'Trener' ?
                <OdbijeniTreninzi /> : <Navigate replace to="/pocetna" />
              } />

          </Routes>
          <Fab sx={{
            margin: 0,
            top: 'auto',
            right: 20,
            bottom: 20,
            left: 'auto',
            position: 'fixed'
          }} onClick={toggleColorMode}>
            {/* <IconButton> */}
            {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            {/* </IconButton> */}
          </Fab>
          {(user && user.tip === 'Korisnik') && <Footer />}
          {(!user) && <Footer />}

        </Router>
      </ThemeProvider >

    </>
  );
}

// function ToggleColorMode() {
//   const [mode, setMode] = useState();
//   const colorMode = useMemo(
//     () => ({
//       toggleColorMode: () => {
//         setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
//       },
//     }),
//     [],
//   );

//   const theme = useMemo(
//     () =>
//       createTheme({
//         palette: {
//           mode,
//         },
//       }),
//     [mode],
//   );

//   return (
//     <ColorModeContext.Provider value={colorMode}>
//       <ThemeProvider theme={theme}>
//         <App />
//       </ThemeProvider>
//     </ColorModeContext.Provider>
//   );
// }

export default App;
