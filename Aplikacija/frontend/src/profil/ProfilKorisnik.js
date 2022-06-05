import { useState, useContext, useEffect, useRef } from "react";
import { UserContext } from '../context/UserContext'
import { GetData, PutMetoda } from '../komponente/Fetch'
import axios from 'axios'
import CircularProgress from '@mui/material/CircularProgress';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { useNavigate } from "react-router-dom";
import Alert from '@mui/material/Alert';
import { Button, TextField } from "@mui/material";
import './../styles/input.css'

const k = {
    ime: 'ime', prezime: 'prezime', brojTelefona: '0625454545', email: 'mail',
    clanarina: '22.3.2022', visina: '178', brojGodina: '22',
    zeljenaTezina: '60', zeljeniProcenatMasti: '', zeljeniProcenatProteina: '', zeljenaTezinaMisica: ''
}

// const n = {
//     tezina: '60', procenatMasti: '22', BMI: '22', kostanaMasa: '22',
//     procenatProteina: '22', tezinaMisica: '22', procenatVode: '22', bodyAge: '22'
// }

const treninzi = [{ id: 1 }, { id: 2 }, { id: 3 }]

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
        zeljenaTezina: user.zeljenaTezina,
        zeljenaTezinaMisica: user.zeljenaTezinaMisica,
        zeljeniProcenatMasti: user.zeljeniProcenatMasti,
        zeljeniProcenatProteina: user.zeljeniProcenatProteina
    })

    useEffect(() => {
        GetData("http://localhost:8800/api/korisnik/vidiClanarinu/" + user.korisnikId, setClanarina, setGreska, setIsLoading)
    }, [])

    const otkaziIzmenu = () => {
        setIzmena(true)
        setNova(false)
    }


    const proveriLozinku = async () => {

        console.log('nisfc')

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

        await axios.put(' http://localhost:8800/api/registrovaniKorisnik/' + user.id, {
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
            <div>
                {tekst}
                <TextField
                    className='loginInp'
                    inputRef={pass}
                    // label={tekst}
                    type='password'
                    color="primary"
                    size="small"
                    placeholder='lozinka'
                    focused />

                {/* <input type='password' placeholder="lozinka" ref={pass} /> */}

                <Button variant="contained" size='small' onClick={OKonClick}>Ok</Button>
                <Button variant="contained" size='small' onClick={otkaziIzmenu}>Otkazi</Button>
            </div>)
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
                zeljeniProcenatProteina: korisnik.zeljeniProcenatProteina,
                zeljenaTezinaMisica: korisnik.zeljenaTezinaMisica,
                zeljeniProcenatMasti: korisnik.zeljeniProcenatMasti,
                zeljenaTezina: korisnik.zeljenaTezina
            }
        }

        setGreska(false)
        await PutMetoda(zahtev, setData, setGreska, setIsLoading)
        console.log(greska)

        dispatch({ tip: "UPDATE_USER", payload: {...user, ...korisnik }})

        setIzmeniPodatke(true)
        // console.log(korisnik)
        // console.log(user)

        // window.location.reload()
    }

    let navigate = useNavigate()

    return (
        <div className='profilKorisnika'>
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

            <div className="infoOProfilu" >

                {!user && <p>nema korisnika</p>}

                <h3>{user.ime} {user.prezime}</h3>
                <p>Clanarina vazi do: {clanarina.trajanje}</p>
                <p>Clanarina: {clanarina.cena}</p>
                <p>Godine: {user.godine}</p>
                <p>e-mail: {user.email}</p>

                <p>Visina: {user.visina}</p>

                <div className="zelje">
                    <span>Broj telefona: {user.brojTelefona}

                    </span>
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

                {izmena && <Button variant="contained" size='small' onClick={() => { setIzmena(false) }}>Promeni lozinku</Button>}
                {!izmena && <div>

                    {!novaLozinka && <Lozinka tekst='Unesite staru lozinku:' OKonClick={proveriLozinku} />}
                    {novaLozinka && <Lozinka tekst='Unesite novu lozinku:' OKonClick={izmeniLozinku} />}

                </div>}

            </div>

        </div >
    )
}

export default Korisnik