import { useState, useEffect, useContext, Fragment, useRef } from 'react';
import Button from '@mui/material/Button';
import Modal from '../../komponente/Modal'
import DodajNapredak from '../../komponente/DodajNapredak';
import { Card, CardContent, Typography, CardActions } from '@mui/material';
import { useLocation } from 'react-router-dom';
import DodajEvidenciju from '../../komponente/DodajEvidenciju';
import { UserContext } from '../../context/UserContext';
import { GetData } from '../../komponente/Fetch';
import NapredakGrafici from '../../komponente/NapredakGrafici';
import axios from 'axios';



const KorisnikVeliko = (props) => {

    const { user } = useContext(UserContext);

    const location = useLocation();

    const k = location.state

    const [napredak, setNapredak] = useState(false)
    const [evidencija, setEvidencija] = useState(false)

    const [nizNapredaka, setNizNapredak] = useState([])
    const [zeljeno, setZeljeno] = useState([])
    const [greska, setGreska] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const [prvi, setPrvi] = useState(false)

    useEffect(() => {
        const get = async () => {
            // GetData("http://localhost:8800/api/korisnik/vidiNapredak/" + k.idkorisnika, setNizNapredaka, setGreska, setIsLoading)
            // console.log(nizNapredaka)
            const res = await axios.get("http://localhost:8800/api/korisnik/vidiNapredak/" + k.idkorisnika)
            setNizNapredak(res.data)
            setZeljeno(res.data.tezina)
            console.log(res.data)
            console.log(k)
        }
        get()
    }, [])

    return (
        <Card sx={{ maxWidth: 345 }} >
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {k.imeK} {k.prezimeK}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    E-mail: {k.email}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Broj telefona: {k.brojtelefonaK}
                </Typography>
            </CardContent>


            <CardActions>
                {!napredak && <Button onClick={() => { setPrvi(true); setNapredak(true) }}>Novi napredak</Button>}
                {napredak && <Button onClick={() => { setPrvi(false); setNapredak(true) }}>Dodaj napredak</Button>}

                {/* <Button onClick={() => setEvidencija(true)}>Dodaj evidenciju</Button> */}
            </CardActions>


            <Card>
                <NapredakGrafici napredak={nizNapredaka} zeljeno={zeljeno} user={k} />
            </Card>

            {napredak && <Modal onClose={() => { setNapredak(false) }}>
                <DodajNapredak prvi={prvi} napredakId={k.napredakId} idKorisnika={k.idkorisnika} onClose={() => { setNapredak(false) }} />
            </Modal>
            }
            {evidencija && <Modal onClose={() => { setEvidencija(false) }}>
                <DodajEvidenciju idKorisnika={k.idkorisnika} onClose={() => { setEvidencija(false) }} />
            </Modal>
            }
        </Card>

    )
}

export default KorisnikVeliko