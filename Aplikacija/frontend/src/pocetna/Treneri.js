import '../styles/Treneri.css'
import { useState, useEffect, useContext } from 'react'
import KalendarForma from '../komponente/KalendarForma';
import { GetData } from '../komponente/Fetch'
import CircularProgress from '@mui/material/CircularProgress';
import LinearProgress from '@mui/material/LinearProgress';

import { Card, CardMedia, CardContent, Typography, Button, Grid, filledInputClasses } from '@mui/material';
import { Box } from '@mui/system';
import { UserContext } from '../context/UserContext';
import Modal from '../komponente/Modal'
import FormaZakazi from '../komponente/FormaZakazi';
import LogIn from './LoginForma';
import Register from './RegisterForma';
import FormaZakaziPersonalni from '../komponente/FormaZakaziPersonalni';



const Treneri = () => {

    const [sviTreneri, setTreneri] = useState([])
    const [greska, setGreska] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const [zakazi, setZakazi] = useState(false)
    const [login, setLogin] = useState(true)

    useEffect(() => {
        const get = async () => { await GetData("http://localhost:8800/api/korisnik/vidiTrenerePersonalni", setTreneri, setGreska, setIsLoading) }
        get()
    }, [])

    const { user, dispatch } = useContext(UserContext);

    const [detalji, setDetalji] = useState({ id: -1, state: true });

    const [vise, setVise] = useState(-1);

    const prikaziVise = (ev) => {
        setDetalji({ id: ev.target.id, state: false });
        setVise(ev.target.id)
        setZakazi(false)
    }

    const prikaziManje = (ev) => {
        setDetalji({ id: -1, state: true });
        setVise(-1)
        setZakazi(false)
    }

    const zakaziForma = (ev) => {
        setZakazi(true)
    }

    const [trenerId, setTrenerId] = useState('')

    return (
        <div className="treneri">
            {isLoading &&   <Box className = 'cardCenter' ><CircularProgress size='2rem' /> </Box>}
          
            {sviTreneri.map((tr, i) => (
                <Card key={i} className="trener" sx={{ margin: '5vh 5vw' }}>
                    <Grid container >

                        <Grid item xs={12} sm={4}>
                            <CardMedia
                                component="img"
                                src={tr.slika}
                                alt={tr.ime}
                                className="trImg" />
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <CardContent id={i} className="divZaOpis" sx={{ flex: '1 0 auto' }}>
                                <Typography component="div" variant="h6">
                                    {tr.ime} {tr.prezime}
                                </Typography>
                                <Typography component="div" variant="subtitle2" >
                                    Sertifikovan za: {
                                        tr.sertifikati.map((s, i) => (
                                            <Typography variant="body2" key={i}>{s}</Typography >
                                        ))
                                    }
                                </Typography>

                                <Typography component="div" variant="subtitle2" >
                                    Iskustvo: {
                                        tr.iskustvo.map((is, i) => (
                                            <Typography variant="body2" key={i}>{is}, </Typography>
                                        ))
                                    }
                                </Typography>
                                <Typography component="div" variant="subtitle2" >
                                    Opis:
                                    <Typography variant="body2"> {tr.opis}</Typography>

                                </Typography>

                                <Button fullWidth variant="contained" onClick={() => { setZakazi(true); setTrenerId(tr.id); }}>Zakazi trening</Button>

                                {zakazi && <Modal onClose={() => { setZakazi(false) }}>

                                    {user ? <FormaZakaziPersonalni idTrenera={trenerId} onClose={() => { setZakazi(false); }} /> : (login ? <div><LogIn />
                                        <span>Nemate nalog:
                                            <Button size='small' onClick={() => { setLogin(false) }}>Registruj se</Button>
                                        </span>
                                    </div>

                                        :

                                        <div><Register />
                                            <span>Imate nalog:
                                                <Button size='small' onClick={() => { setLogin(true) }}>Prijavi se</Button>
                                            </span>
                                        </div>)
                                    }


                                </Modal>}


                                {/* {!detalji.state && detalji.id == i && <p></p>} */}

                                {/* {!detalji.state && detalji.id == i && zakazi && 
                            <KalendarForma id={i} imeTrenera={tr.ime} prezimeTrenera={tr.prezime} />} */}

                                {/* {detalji.id !== i && <button className='dugme' id={i} onClick={prikaziVise}>Prikazi vise</button>} */}
                                {/* {vise != i && <Button variant="contained" size = "small" className='dugme' id={i} onClick={prikaziVise}>Prikazi vise</Button>} */}

                                {/* {detalji.id == i && <Button variant="contained" size = "small" className='dugme' onClick={prikaziManje}>Sakrij</Button>} */}
                                {/* {!detalji.state && detalji.id == i && !zakazi && <button className='dugme' onClick={zakaziForma}>Vidi raspored</button>} */}

                            </CardContent>

                        </Grid>
                    </Grid>
                </Card>
            ))}

        </div>
    )

}
export default Treneri;