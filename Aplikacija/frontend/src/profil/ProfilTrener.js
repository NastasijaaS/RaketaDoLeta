import React, { useState, useEffect, useContext, Fragment, useRef } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Tabela from './Uprava/TabelaKorisnici';
import TabelaUsluge from './Uprava/TabelaUsluge';
import OdbijeniTreninzi from './Uprava/TabelaOdbijeniTreninzi';
import TabelaTreneri from './Uprava/TabelaTreneri';
import KorisniciTrenera from './Trener/Korisnici';
import { UserContext } from '../context/UserContext';
import {Card,CardMedia,CardContent,CardActionArea} from '@mui/material';
//izmeni korisnika


//obrisi klijenta
//get klijente
//napredak za klijenta

//zakazi grupni trening
//get treninzi

//prihvati trening
//dodaj evidenciju
//pogledaj evidenciju

//izmeni trening
//zakazi grupni trening

//dodaj profilnu sliku
//dodaj opis



const Trener = (props) => {

    const { user } = useContext(UserContext);

    const [value, setValue] = React.useState(0);

    const promeniTab = (event, newValue) => {
        setValue(newValue);
    };

    return (<Box sx={{ bgcolor: 'background.paper' }}>

        {/* <KorisniciTrenera/> */}

        <Card className="blog" sx={{ maxWidth: 345 }} >
            <CardActionArea>
                <CardMedia
                    component="img"
                    image={user.slika}
                    alt={user.ime}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                    {user.ime} {user.prezime}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        E-mail: {user.email}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Broj telefona: {user.brojTelefona}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {user.sertifikati}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {user.iskustvo}
                    </Typography>
                </CardContent>

            </CardActionArea>
        </Card>

    </Box>
    );
}

export default Trener