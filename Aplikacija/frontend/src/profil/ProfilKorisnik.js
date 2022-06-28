import { useState, useContext, useEffect, useRef, Fragment } from "react";
import { UserContext } from '../context/UserContext'
import { GetData, PutMetoda } from '../komponente/Fetch'
import axios from 'axios'
import CircularProgress from '@mui/material/CircularProgress';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { useNavigate } from "react-router-dom";
import { Button,  Card,  Typography, Grid, CardActions, CardContent } from "@mui/material";
import './../styles/input.css'
import IzmeniLozinku from "../komponente/Inputi/IzmeniLozinku";
import useAxiosPrivate from "../api/useAxiosPrivate";

const Korisnik = (props) => {

    const axiosPrivate = useAxiosPrivate();

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
            try {
                setIsLoading(true)
                const res = await axiosPrivate.get("http://localhost:8800/api/clanarina/vidiClanarinu/" + user.korisnikId)
                setClanarina(res.data)
                const res1 = await axiosPrivate.get("http://localhost:8800/api/napredak/vidiNapredakPoslednji/" + user.korisnikId)
                setPoslednji(res1.data)
                setIsLoading(false)

            } catch (error) {
                setIsLoading(false)
                if (!error?.response) {
                    setGreska('No Server Response')
                } else {
                    setGreska('Doslo je do greske prilikom ucitavanja')
                }
            }
        }

        get()
    }, [])

    const otkaziIzmenu = () => {
        setIzmena(true)
        setNova(false)
    }

    const [data, setData] = useState('')

    const izmeniKorisnika = async () => {

        if (korisnik.visina === '' || korisnik.visina < 0
            || korisnik.brojGodina === '' || korisnik.brojGodina < 0
            || korisnik.zeljeniProcenatProteina === '' || korisnik.zeljeniProcenatProteina < 0
            || korisnik.zeljenaTezinaMisica === '' || korisnik.zeljenaTezinaMisica < 0
            || korisnik.zeljeniProcenatMasti === '' || korisnik.zeljeniProcenatMasti < 0
            || korisnik.zeljenaTezina === '' || korisnik.zeljenaTezina < 0
        ) {
            alert('Molimo unesite ispravne podatke')
            //console.log(korisnik)
            return
        }

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
        // PutMetoda(zahtev, setData, setGreska, setIsLoading)
        // console.log(greska)

        try {
            const res = await axiosPrivate.put(zahtev.url, zahtev.body)
            if (res.status === 200) {
                dispatch({ tip: "UPDATE_USER", payload: { ...user, ...korisnik } })
            }
        }
        catch (err) {
            alert('Doslo je do greske')
            setKorisnik({
                visina: user.visina,
                brojGodina: user.brojGodina,
                zeljenaTezina: user.zeljenaTezina,
                zeljenaTezinaMisica: user.zeljenaTezinaMisica,
                zeljeniProcenatMasti: user.zeljeniProcenatMasti,
                zeljeniProcenatProteina: user.zeljeniProcenatProteina
            })
        }



        setIzmeniPodatke(true)
    }

    let navigate = useNavigate()

    return (
        <Box sx={{ padding: "5% 5%" }}>

            {isLoading && <CircularProgress size='2rem' disableShrink />}

            {/* <Typography display='flex' mb={5} justifyContent="center" variant="h4" >{user.ime} {user.prezime}</Typography> */}
            <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                    <Card variant="outlined" sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <CardContent sx={{ flexGrow: '1', marginBottom: '5%' }}>
                            {!user && <p>nema korisnika</p>}

                            <Typography className='cardCenter' component="div" variant="h4" sx={{ height: '35%', textTransform: 'capitalize' }}>{user.ime} {user.prezime}</Typography>

                            <Typography mb={2}>Clanarina vazi do: {new Date(clanarina.vaziDo).toLocaleDateString()}</Typography>

                            <Typography mb={2}>e-mail: {user.email}</Typography>

                            <Typography mb={2}>Broj telefona: {user.brojTelefona}</Typography>

                            <Typography className="zelje">
                                Godine:
                                <input className='korisnik'
                                    type='number'
                                    minvalue={0}
                                    maxvalue={100}
                                    value={korisnik.brojGodina}
                                    disabled={izmeniPodatke}
                                    onChange={(ev) => setKorisnik((k) => ({ ...k, brojGodina: ev.target.value }))} />

                            </Typography>

                            <Typography className="zelje">
                                Visina:
                                <input className='korisnik'
                                    type='number'
                                    minvalue={0}
                                    maxvalue={260}
                                    value={korisnik.visina}
                                    disabled={izmeniPodatke}
                                    onChange={(ev) => setKorisnik((k) => ({ ...k, visina: ev.target.value }))} />

                            </Typography>
                        </CardContent>
                        <CardActions sx={{ justifyContent: 'center', alignItems: 'center' }}>
                            {izmena && <Button mb={2} variant="outlined" fullWidth onClick={() => { setIzmena(false) }}>Promeni lozinku</Button>}
                            {!izmena &&
                                <IzmeniLozinku onClose={() => { setIzmena(true) }} />
                            }
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={4} >
                    <Card className="ZeljeKorisnika" variant="outlined" sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <CardContent sx={{ flexGrow: '1' }}>
                            <Typography gutterBottom variant="h6">Zeljene vrednosti</Typography>
                            <Box className="zelje">
                                Zeljena tezina:
                                <input className='korisnik'
                                    type='number'
                                    minvalue={0}
                                    maxvalue={200}
                                    value={korisnik.zeljenaTezina}
                                    disabled={izmeniPodatke}
                                    onChange={(ev) => setKorisnik((k) => ({ ...k, zeljenaTezina: ev.target.value }))} />

                            </Box>

                            <Box className="zelje">
                                Zeljena tezina misica:
                                <input className='korisnik'
                                    type='number'
                                    minvalue={0}
                                    maxvalue={100}
                                    value={korisnik.zeljenaTezinaMisica}
                                    disabled={izmeniPodatke}
                                    onChange={(ev) => setKorisnik((k) => ({ ...k, zeljenaTezinaMisica: ev.target.value }))} />
                            </Box>

                            <Box className="zelje">
                                Zeljeni procenat masti:
                                <input className='korisnik'
                                    type='number'
                                    minvalue={0}
                                    maxvalue={100}
                                    value={korisnik.zeljeniProcenatMasti}
                                    disabled={izmeniPodatke}
                                    onChange={(ev) => setKorisnik((k) => ({ ...k, zeljeniProcenatMasti: ev.target.value }))} />
                            </Box>

                            <Box className="zelje">
                                Zeljeni procenat proteina:
                                <input className='korisnik'
                                    type='number'
                                    minvalue={0}
                                    maxvalue={100}
                                    value={korisnik.zeljeniProcenatProteina}
                                    disabled={izmeniPodatke}
                                    onChange={(ev) => setKorisnik((k) => ({ ...k, zeljeniProcenatProteina: ev.target.value }))} />
                            </Box>
                        </CardContent>
                        <CardActions>
                            {!izmeniPodatke && <Button variant="contained" size='small' onClick={izmeniKorisnika}>OK</Button>}
                            {!izmeniPodatke && <Button variant="contained" size='small' onClick={() => {
                                setIzmeniPodatke(true); setKorisnik({
                                    visina: user.visina,
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
                <Grid item xs={12} sm={4}>
                    {poslednji
                        &&
                        <Card variant="outlined" sx={{ height: '100%' }}>
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
                                <Button href={"/napredak"} variant="outlined" fullWidth>Vidi napredak</Button>
                            </CardActions>
                        </Card>
                    }
                </Grid>
            </Grid>
        </Box >
    )
}

export default Korisnik