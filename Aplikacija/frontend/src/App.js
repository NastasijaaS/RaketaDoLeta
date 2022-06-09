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

const ColorModeContext = createContext({ toggleColorMode: () => { } });

function App() {

  const [mode, setMode] = useState(false);

  const theme =
    createTheme({
      palette: {
        mode: mode ? "dark" : "light"
      }
    })


  {/*const theme = useTheme();
    const colorMode = useContext(ColorModeContext);*/}
  const { user } = useContext(UserContext);

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Router>
          <ScrollToTop enableColorScheme />

          <Navbar check={mode} change={() => setMode(!mode)} />
          {/* {
        (user && user.tip === 'Uprava' && <NavbarUprava />)
         ||
        ((user && user.tip === 'Trener') ? (<NavbarTrener />) : <Navbar check = {mode} change = {()=>setMode(!mode)}/>)
        } */}

          {/* {theme.palette.mode} mode
      <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
        {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton> */}


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

            <Route path='/RDL/trener/korisnici' element={<KorisniciTrenera />} />
            <Route path='/RDL/trener/:username/zahtevi' element={<ZahteviTrenera />} />
            <Route path='/RDL/trener/:username/treninzi' element={<TreninziTrenera />} />
            <Route path='/trener/korisnik/:ime' element={<KorisnikVeliko />} />

          </Routes>

          {/* <Footer /> */}
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
