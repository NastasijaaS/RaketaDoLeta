import { useState, useContext, useEffect, useRef, Fragment } from "react";
import { UserContext } from '../context/UserContext'
import { GetData, PutMetoda } from '../komponente/Fetch'
import axios from 'axios'
import CircularProgress from '@mui/material/CircularProgress';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { useNavigate } from "react-router-dom";
import Alert from '@mui/material/Alert';
import { Button, TextField, Card, Paper, Typography, Grid, CardActions, CardContent } from "@mui/material";
import './../styles/input.css'
import { Container } from "@mui/system";
import IzmeniLozinku from "../komponente/IzmeniLozinku";


const Korisnik = (props) => {

    const { user, dispatch } = useContext(UserContext);
    const [izmena, setIzmena] = useState(true)
    const [izmeniPodatke, setIzmeniPodatke] = useState(true)

    const [clanarina, setClanarina] = useState({ datumDo: '', cena: '' })

    const [greska, setGreska] = useState(false)

    const [novaLozinka, setNova] = useState(false)
    const pass = useRef('')
    const [isLoading, setIsLoading] = useState(false)

    const [korisnik, setKorisnik] = useState({
        visina: user.visina,
        brojGodina: user.brojGodina,
        zeljenaTezina: user.zeljenaTezina,
        zeljenaTezinaMisica: user.zeljenaTezinaMisica,
        zeljeniProcenatMasti: user.zeljeniProcenatMasti,
        zeljeniProcenatProteina: user.zeljeniProcenatProteina
    })

    useEffect(() => {
        const get = async () => { await GetData("http://localhost:8800/api/korisnik/vidiClanarinu/" + user.korisnikId, setClanarina, setGreska, setIsLoading) }
        get()
    }, [])

    const otkaziIzmenu = () => {
        setIzmena(true)
        setNova(false)
    }


    const proveriLozinku = async () => {

        if (pass.current.value == '') {
            alert('Morate uneti lozinku')
            return
        }
        if (pass.current.value.length < 6) {
            alert('Lozinka mora imati najmanje 6 karaktera')
            return
        }

        await axios.post(' http://localhost:8800/api/auth/proveriSifru', {
            id: user.id,
            password: pass.current.value
        }).then((p) => {

            if (p.status === 200) {
                setNova(true)
                console.log(p)
            }
        }).catch((error) => {
            if (error.response.status)
                alert(error.response.data)
            else
                alert('Doslo je do greske')
        });
    }

    const izmeniLozinku = async () => {

        if (pass.current.value == '') {
            alert('Morate uneti lozinku')
            return
        }
        if (pass.current.value.length < 6) {
            alert('Lozinka mora imati najmanje 6 karaktera')
            return
        }

        await axios.put('http://localhost:8800/api/registrovaniKorisnik/' + user.id, {
            registrovaniKorisnikId: user.id,
            password: pass.current.value
        }).then((p) => {
            if (p.status === 200) {
                alert('Uspesno ste promenili lozinku')
                otkaziIzmenu()
            }
        }).catch((error) => {
            console.log(error);
        });
    }

    const Lozinka = ({ tekst, OKonClick }) => {
        return (
            // <div>
            //     {tekst}
            <Fragment>
                <TextField

                    id="outlined-textarea"
                    label={tekst}
                    placeholder="Lozinka"
                    variant="outlined"
                    type='password'
                    color="primary"
                    size="small"
                    inputRef={pass}
                />

                {/* <input type='password' placeholder="lozinka" ref={pass} /> */}
                <Box>
                    <Button variant="contained" size='small' sx={{ margin: "1%" }} onClick={OKonClick}>Ok</Button>
                    <Button variant="contained" size='small' sx={{ margin: "1%" }} onClick={otkaziIzmenu}>Otkazi</Button>
                </Box>
            </Fragment>
            // </div>
        )
    }

    const [data, setData] = useState('')
    const izmeniKorisnika = async () => {
        ///izmeniParametre/:idKorisnika
        // zeljeniProcenatProteina
        // zeljenaTezinaMisica
        // zeljeniProcenatMasti
        // zeljenaTezina



        const zahtev = {
            url: 'http://localhost:8800/api/korisnik/izmeniParametre/' + user.korisnikId,
            body: {
                visina: korisnik.visina,
                brojGodina: korisnik.brojGodina,
                zeljeniProcenatProteina: korisnik.zeljeniProcenatProteina,
                zeljenaTezinaMisica: korisnik.zeljenaTezinaMisica,
                zeljeniProcenatMasti: korisnik.zeljeniProcenatMasti,
                zeljenaTezina: korisnik.zeljenaTezina
            }
        }

        setGreska(false)
        await PutMetoda(zahtev, setData, setGreska, setIsLoading)
        console.log(greska)

        dispatch({ tip: "UPDATE_USER", payload: { ...user, ...korisnik } })

        setIzmeniPodatke(true)
        // console.log(korisnik)
        // console.log(user)

        // window.location.reload()
    }

    let navigate = useNavigate()

    return (
        <Box sx={{ margin: "10vh 10vw" }}>

            {isLoading && <CircularProgress size='2rem' disableShrink />}
            {/* <Grid container spacing={2}> */}

            {/* <Modal
                sx={{ display: 'flex', justifyContent: 'center' }}
                open={greska ? true : false}
                onClose={() => navigate(-1)}
            >
                <Alert
                    severity="error"
                    sx={{
                        height: 100,
                        display: 'flex',
                        justifyContent: 'center',
                        alignSelf: 'center'
                    }}

                >Doslo je do greske prilikom ucitavanja ):</Alert>
            </Modal> */}

            <Typography display='flex' mb={5} justifyContent="center" variant="h4" >{user.ime} {user.prezime}</Typography>
            <Box className='profilKorisnika'>
                <Card className="infoOProfilu" >
                    <CardContent>
                        {!user && <p>nema korisnika</p>}

                        {/* <Typography gutterBottom variant = "h4">{user.ime} {user.prezime}</Typography> */}
                        <Typography mb={2} variant="h6">Profil:</Typography>

                        <Typography mb={2}>Clanarina vazi do: {new Date(clanarina.vaziDo).toLocaleDateString()}</Typography>

                        <Typography mb={2}>e-mail: {user.email}</Typography>

                        <Typography>Broj telefona: {user.brojTelefona}</Typography>
                    </CardContent>
                    <CardActions>
                        {izmena && <Button mb={2} variant="contained" size='small' onClick={() => { setIzmena(false) }}>Promeni lozinku</Button>}
                        {!izmena &&
                            <IzmeniLozinku onClose={() => { setIzmena(true) }} />
                            // <Container className='lozinka'>
                            //     {!novaLozinka && <Lozinka tekst='Unesite staru lozinku' OKonClick={proveriLozinku} />}
                            //     {novaLozinka && <Lozinka tekst='Unesite novu lozinku' OKonClick={izmeniLozinku} />}
                            // </Container>
                        }
                    </CardActions>
                </Card>
                <Card className="ZeljeKorisnika">
                    <CardContent>
                        <div className="zelje">
                            Godine:
                            <input className='korisnik'
                                type='number'
                                value={korisnik.brojGodina}
                                disabled={izmeniPodatke}
                                onChange={(ev) => setKorisnik((k) => ({ ...k, brojGodina: ev.target.value }))} />

                        </div>

                        <div className="zelje">
                            Visina:
                            <input className='korisnik'
                                type='number'
                                value={korisnik.visina}
                                disabled={izmeniPodatke}
                                onChange={(ev) => setKorisnik((k) => ({ ...k, visina: ev.target.value }))} />

                        </div>
                        <div className="zelje">
                            Zeljena tezina:
                            <input className='korisnik'
                                type='number'
                                value={korisnik.zeljenaTezina}
                                disabled={izmeniPodatke}
                                onChange={(ev) => setKorisnik((k) => ({ ...k, zeljenaTezina: ev.target.value }))} />

                        </div>

                        <div className="zelje">
                            Zeljena tezina misica:
                            <input className='korisnik'
                                type='number'
                                value={korisnik.zeljenaTezinaMisica}
                                disabled={izmeniPodatke}
                                onChange={(ev) => setKorisnik((k) => ({ ...k, zeljenaTezinaMisica: ev.target.value }))} />
                        </div>

                        <div className="zelje">
                            Zeljeni procenat masti:
                            <input className='korisnik'
                                type='number'
                                value={korisnik.zeljeniProcenatMasti}
                                disabled={izmeniPodatke}
                                onChange={(ev) => setKorisnik((k) => ({ ...k, zeljeniProcenatMasti: ev.target.value }))} />
                        </div>

                        <div className="zelje">
                            Zeljeni procenat proteina:
                            <input className='korisnik'
                                type='number'
                                value={korisnik.zeljeniProcenatProteina}
                                disabled={izmeniPodatke}
                                onChange={(ev) => setKorisnik((k) => ({ ...k, zeljeniProcenatProteina: ev.target.value }))} />
                        </div>
                    </CardContent>
                    <CardActions>
                        {!izmeniPodatke && <Button onClick={izmeniKorisnika}>OK</Button>}
                        {!izmeniPodatke && <Button onClick={() => {
                            setIzmeniPodatke(true); setKorisnik({
                                zeljenaTezina: user.zeljenaTezina,
                                zeljenaTezinaMisica: user.zeljenaTezinaMisica,
                                zeljeniProcenatMasti: user.zeljeniProcenatMasti,
                                zeljeniProcenatProteina: user.zeljeniProcenatProteina
                            })
                        }}>otkazi</Button>}

                        {izmeniPodatke && <Button variant="contained" size='small' onClick={() => { setIzmeniPodatke(false) }}>Izmeni podatke</Button>}
                    </CardActions>
                </Card>
            </Box>
        </Box >
    )
}

export default Korisnik