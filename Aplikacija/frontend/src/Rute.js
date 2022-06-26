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
import VelikiBlog from './pocetna/VelikiBlog'
import NavbarTrener from './komponente/NavbarTrener';
import Tabela from './profil/Uprava/TabelaKorisnici';
import ZahteviTrenera from './profil/Trener/Zahtevi';
import TreninziTrenera from './profil/Trener/Treninzi';
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


function Rute() {

    const { user } = useContext(UserContext);


    return (


        <>


         
            <Routes>

                <Route path='/profil' element=
                    {!user ? <Navigate replace to="/pocetna" /> : <UserPocetna />} />


                {/* <Route path='/profil' element={<UserPocetna />} ></Route> */}

                { }
                {/* <Route path='/RDL/trener/korisnici'
              element={user && user?.tip === 'Trener' ?
                <KorisniciTrenera /> : <Navigate replace to="/pocetna" />} /> */}

                <Route path='/RDL/trener/korisnici'
                    element={
                        <KorisniciTrenera />} />

                <Route path='/RDL/trener/:username/zahtevi'
                    element={user && user?.tip === 'Trener' ?
                        <ZahteviTrenera /> : <Navigate replace to="/pocetna" />} />

                <Route path='/RDL/trener/:username/treninzi'
                    element={user && user?.tip === 'Trener' ?
                        <TreninziTrenera /> : <Navigate replace to="/pocetna" />} />

                <Route path='/trener/korisnik/:ime'
                    element={user && user?.tip === 'Trener' ?
                        <KorisnikVeliko /> : <Navigate replace to="/pocetna" />} />

                <Route path='/RDL/trener/odbijenizahtevi'
                    element={user && user?.tip === 'Trener' ?
                        <OdbijeniTreninzi /> : <Navigate replace to="/pocetna" />
                    } />

            </Routes>
        </>


    );
}

export default Rute;
