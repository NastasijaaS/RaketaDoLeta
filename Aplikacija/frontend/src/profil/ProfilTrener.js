import React, { useState, useEffect, useContext, Fragment, useRef } from 'react';
import Box from '@mui/material/Box';
import { UserContext } from '../context/UserContext';
import { Typography, Card, CardMedia, CardContent, CardActionArea, Grid, Button, CardActions, IconButton } from '@mui/material';
import { GetData } from '../komponente/Fetch';
import Modal from '../komponente/Modal';
import FormaZakaziPersonalni from '../komponente/FormaZakaziPersonalni';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import IzmeniLozinku from '../komponente/IzmeniLozinku'
import KalendarForma from '../komponente/KalendarForma';
import FormaDodajTermin from '../komponente/FormaDodajTermin';

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

    const [izmena, setIzmena] = useState(false)

    const promeniTab = (event, newValue) => {
        setValue(newValue);
    };


    const [treninzi, setTreninzi] = useState([])
    const [greska, setGreska] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const [refresh, setRefresh] = useState(false)
    const [noviTrening, setNoviTrening] = useState(false)
    const [noviTermini, setNoviTermini] = useState(false)


    useEffect(() => {
        const get = async () => { await GetData("http://localhost:8800/api/trener/vratiTreninge/" + user.trenerId, setTreninzi, setGreska, setIsLoading) }

        get()
    }, [])


    const dodajTrening = () => {
        console.log(treninzi)

        //router.post("/zakaziGrupniTrening/:id",
        /** imeT:regT.ime,
                prezimeT:regT.prezime,
                datum: req.body.datum,
                nazivGrupnogTreninga: req.body.nazivGrupnogTreninga,
                intenzitet: req.body.intenzitet,
                trajanje:req.body.trajanje,
                brojMaxClanova: req.body.brojMaxClanova,
                trenerId: trener._id */
    }

    const izmeniTrening = () => {
        console.log(treninzi)
    }


    return (

        <Box className='marginS' sx={{ height: '100vh', width: '100vw' }} >
            <Grid container spacing={2} sx={{ height: '100vh', width: '100vw' }}>
                {/* <KorisniciTrenera/> */}
                <Grid item xs={12} md={3}>
                    <Card className='cardShadow' sx={{ maxWidth: 345, height: '100%', display: 'flex', flexDirection: 'column' }} >
                        <CardMedia
                            component="img"
                            image={user.slika ? user.slika : "https://www.ossrb.org/media/k2/items/cache/24c01e452493eba0f9e741ef09a2d61a_XL.jpg"}
                            alt={user.ime}
                            className='imgTrProfil'
                        // image="https://www.ossrb.org/media/k2/items/cache/24c01e452493eba0f9e741ef09a2d61a_XL.jpg
                        />
                        <CardContent sx={{ flexGrow: '1' }}>
                            <Typography gutterBottom variant="h5" component="div">
                                {user.ime} {user.prezime}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                E-mail: {user.email}
                            </Typography>
                            <Typography gutterBottom variant="body2" color="text.secondary">
                                Broj telefona: {user.brojTelefona}
                            </Typography>
                            <Typography variant="subtitle2" >
                                Sertifikovan za: {
                                    user.sertifikati.map((s, i) => (
                                        <Typography variant="body2" key={i}>{s}</Typography >
                                    ))
                                }
                            </Typography>
                        </CardContent>
                        <CardActions sx={{ justifyContent: 'center' }}>
                            {!izmena && <Button variant="contained" size="small" onClick={() => { setIzmena(true) }}>Promeni lozinku</Button>}
                            {izmena && <IzmeniLozinku onClose={() => { setIzmena(false) }} />}

                        </CardActions>
                    </Card>
                </Grid>
                <Grid item xs={12} md={9}>
                    <Box>

                        <Box>
                            <Button variant="outlined" sx={{ marginBottom: '2%' }} onClick={() => setNoviTrening(true)}>Zakazi grupni trening</Button>
                            <Button variant="outlined" sx={{ marginBottom: '2%' }} onClick={() => setNoviTermini(true)}>Unesi termine</Button>
                        </Box>


                        <KalendarForma idTrenera={user.trenerId} />
                        {noviTrening
                            &&
                            <Modal onClose={() => { setNoviTrening(false) }}>
                                <FormaZakaziPersonalni idTrenera={user.trenerId} grupni={true} onClose={() => { setNoviTrening(false) }} />
                            </Modal>}

                        {noviTermini
                            &&
                            <Modal onClose={() => { setNoviTermini(false) }}>
                               <FormaDodajTermin idTrenera = {user.trenerId} onClose={() => { setNoviTermini(false) }} />
                            </Modal>}

                        <Grid container spacing={2} >
                            {treninzi.map((tr) => (
                                <Grid item xs={12} sm={6} md={4} lg={3}>
                                    <Card className='cardShadow' key={tr.id} sx={{ maxWidth: 345 }} >
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div">
                                                Nada Jovanovic
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Broj telefona
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {tr.datum} {tr.vreme}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Trajanje: {tr.trajanje}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Intenzitet: {tr.intenzitet}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Tip: {tr.tip}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Online: {tr.isOnline}
                                            </Typography>
                                        </CardContent>
                                        <CardActions sx={{ justifyContent: 'flex-end' }}>
                                            <IconButton sx={{ p: 0, color: 'inherit' }}>
                                                <EditIcon sx={{ fontSize: "1em" }} />
                                            </IconButton>
                                            <IconButton sx={{ p: 0, color: 'green' }}>
                                                <CheckCircleIcon sx={{ fontSize: "1em" }} />
                                            </IconButton>
                                            <IconButton sx={{ p: 0, color: 'red' }}>
                                                <CloseIcon sx={{ fontSize: "1em" }} />
                                            </IconButton>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </Grid>
            </Grid>


        </Box>
    );
}

export default Trener