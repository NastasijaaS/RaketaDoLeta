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
    const [poslednji, setPoslednji] = useState()

    const [korisnik, setKorisnik] = useState({
        visina: user.visina,
        brojGodina: user.brojGodina,
        zeljenaTezina: user.zeljenaTezina,
        zeljenaTezinaMisica: user.zeljenaTezinaMisica,
        zeljeniProcenatMasti: user.zeljeniProcenatMasti,
        zeljeniProcenatProteina: user.zeljeniProcenatProteina
    })

    useEffect(() => {
        const get = async () => {
            await GetData("http://localhost:8800/api/korisnik/vidiClanarinu/" + user.korisnikId, setClanarina, setGreska, setIsLoading) 
            const res1 = await axios.get("http://localhost:8800/api/korisnik/vidiNapredakPoslednji/" + user.korisnikId)
            setPoslednji(res1.data)
            console.log(res1.data)
        }
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
        <Box sx = {{padding:"5% 5%"}}>

            {isLoading && <CircularProgress size='2rem' disableShrink />}
              

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

            {/* <Typography display='flex' mb={5} justifyContent="center" variant="h4" >{user.ime} {user.prezime}</Typography> */}
            <Grid container spacing={2}>
                <Grid item xs = {12} sm = {4}>
                <Card variant="outlined" sx ={{display: 'flex', flexDirection: 'column', height: '100%'}}>
                    <CardContent sx = {{flexGrow: '1', marginBottom: '5%'}}>
                        {!user && <p>nema korisnika</p>}

                        <Typography className='cardCenter' component = "div" variant = "h4" sx = {{height: '35%', textTransform:'capitalize'}}>{user.ime} {user.prezime}</Typography>

                        <Typography mb={2}>Clanarina vazi do: {new Date(clanarina.vaziDo).toLocaleDateString()}</Typography>

                        <Typography mb={2}>e-mail: {user.email}</Typography>

                        <Typography mb={2}>Broj telefona: {user.brojTelefona}</Typography>

                        <Typography className="zelje">
                            Godine:
                            <input className='korisnik'
                                type='number'
                                value={korisnik.brojGodina}
                                disabled={izmeniPodatke}
                                onChange={(ev) => setKorisnik((k) => ({ ...k, brojGodina: ev.target.value }))} />

                        </Typography>

                        <Typography className="zelje">
                            Visina:
                            <input className='korisnik'
                                type='number'
                                value={korisnik.visina}
                                disabled={izmeniPodatke}
                                onChange={(ev) => setKorisnik((k) => ({ ...k, visina: ev.target.value }))} />

                        </Typography>
                    </CardContent>
                    <CardActions sx = {{justifyContent:'center', alignItems:'center'}}>
                        {izmena && <Button mb={2} variant="outlined" fullWidth onClick={() => { setIzmena(false) }}>Promeni lozinku</Button>}
                        {!izmena &&
                            <IzmeniLozinku onClose={() => { setIzmena(true) }} />
                            // <Container className='lozinka'>
                            //     {!novaLozinka && <Lozinka tekst='Unesite staru lozinku' OKonClick={proveriLozinku} />}
                            //     {novaLozinka && <Lozinka tekst='Unesite novu lozinku' OKonClick={izmeniLozinku} />}
                            // </Container>
                        }
                    </CardActions>
                </Card>
                </Grid>
                <Grid item xs = {12} sm = {4} >
                <Card className="ZeljeKorisnika" variant="outlined" sx ={{display: 'flex', flexDirection: 'column',height: '100%'}}>
                    <CardContent sx = {{flexGrow:'1'}}>
                    <Typography gutterBottom variant="h6">Zeljene vrednosti</Typography>
                        <Box className="zelje">
                            Zeljena tezina:
                            <input className='korisnik'
                                type='number'
                                value={korisnik.zeljenaTezina}
                                disabled={izmeniPodatke}
                                onChange={(ev) => setKorisnik((k) => ({ ...k, zeljenaTezina: ev.target.value }))} />

                        </Box>

                        <Box className="zelje">
                            Zeljena tezina misica:
                            <input className='korisnik'
                                type='number'
                                value={korisnik.zeljenaTezinaMisica}
                                disabled={izmeniPodatke}
                                onChange={(ev) => setKorisnik((k) => ({ ...k, zeljenaTezinaMisica: ev.target.value }))} />
                        </Box>

                        <Box className="zelje">
                            Zeljeni procenat masti:
                            <input className='korisnik'
                                type='number'
                                
                                value={korisnik.zeljeniProcenatMasti}
                                disabled={izmeniPodatke}
                                onChange={(ev) => setKorisnik((k) => ({ ...k, zeljeniProcenatMasti: ev.target.value }))} />
                        </Box>

                        <Box className="zelje">
                            Zeljeni procenat proteina:
                            <input className='korisnik'
                                type='number'
                                value={korisnik.zeljeniProcenatProteina}
                                disabled={izmeniPodatke}
                                onChange={(ev) => setKorisnik((k) => ({ ...k, zeljeniProcenatProteina: ev.target.value }))} />
                        </Box>
                    </CardContent>
                    <CardActions>
                        {!izmeniPodatke && <Button variant = "contained" size = 'small' onClick={izmeniKorisnika}>OK</Button>}
                        {!izmeniPodatke && <Button variant = "contained" size = 'small'onClick={() => {
                            setIzmeniPodatke(true); setKorisnik({
                                zeljenaTezina: user.zeljenaTezina,
                                zeljenaTezinaMisica: user.zeljenaTezinaMisica,
                                zeljeniProcenatMasti: user.zeljeniProcenatMasti,
                                zeljeniProcenatProteina: user.zeljeniProcenatProteina
                            })
                        }}>otkazi</Button>}

                        {izmeniPodatke && <Button variant="outlined" fullWidth onClick={() => { setIzmeniPodatke(false) }}>Izmeni podatke</Button>}
                    </CardActions>
                </Card>
                </Grid>
                <Grid item xs = {12} sm = {4}>
                { poslednji
                &&
                <Card variant="outlined"  sx ={{height: '100%'}}>
                    <CardContent>
                        <Typography variant="h6">Poslednje merenje</Typography>
                        <p>Tezina: {poslednji.tezina}</p>
                        <p>Procenat masti: {poslednji.procenatMasti}</p>
                        <p>Procenat proteina: {poslednji.procenatProteina}</p>
                        <p>Tezina misica: {poslednji.tezinaMisica}</p>
                        <p>Procenat vode: {poslednji.procenatVode}</p>
                        <p>Kostana masa: {poslednji.kostanaMasa}</p>
                        <p>BMI: {poslednji.BMI}</p>
                        <p>BodyAge: {poslednji.bodyAge}</p>
                    </CardContent>
                    <CardActions>
                        <Button href={"/napredak"} variant = "outlined" fullWidth>Vidi napredak</Button>
                    </CardActions>
                </Card>
                }
                </Grid>
            </Grid>
        </Box >
    )
}

export default Korisnik