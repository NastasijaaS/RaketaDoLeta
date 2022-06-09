import { useState, useEffect, useContext, Fragment, useRef } from 'react';
import Button from '@mui/material/Button';
import Modal from '../../komponente/Modal'
import DodajNapredak from '../../komponente/DodajNapredak';
import { Card, CardContent, Typography, CardActions } from '@mui/material';
import { useLocation } from 'react-router-dom';
import DodajEvidenciju from '../../komponente/DodajEvidenciju';
import { UserContext } from '../../context/UserContext';
import { GetData } from '../../komponente/Fetch';

const KorisnikVeliko = (props) => {

    const { user } = useContext(UserContext);

    const location = useLocation();

    const k = location.state

    const [napredak, setNapredak] = useState(false)
    const [evidencija, setEvidencija] = useState(false)

    const [nizNapredaka, setNizNapredaka] = useState()
    const [greska, setGreska] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const get = async () => {
            await
                GetData("http://localhost:8800/api/korisnik/vidiNapredak/" + k.idkorisnika, setNizNapredaka, setGreska, setIsLoading)
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
                <Button onClick={() => setNapredak(true)}>Dodaj napredak</Button>
                {nizNapredaka &&
                    <Button onClick={() => setEvidencija(true)}>Dodaj evidenciju</Button>}
            </CardActions>


            <div> BMI

                {
                    nizNapredaka.BMI.map((n) => (
                        <CardContent key={n}>
                            <Typography gutterBottom component="div">
                                {n}
                            </Typography>

                        </CardContent>
                    ))
                }
            </div>

            {napredak && <Modal onClose={() => { setNapredak(false) }}>
                <DodajNapredak idKorisnika={k.idkorisnika} onClose={() => { setNapredak(false) }} />
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