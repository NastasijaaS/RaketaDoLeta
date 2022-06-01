import { useState, useContext, useEffect, useRef } from "react";
import { UserContext } from '../../context/UserContext'
import { GetData } from '../komponente/Fetch'
import FormaZakazi from '../komponente/FormaZakazi'
import Modal from '../komponente/Modal'
import axios from 'axios'
import CircularProgress from '@mui/material/CircularProgress';


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
    const [noviTrening, setNoviTrening] = useState(false)

    const [clanarina, setClanarina] = useState({ datumDo: '', cena: '' })
    const [napredak, setNapredak] = useState([])
    const [zakazaniTreninzi, setZakazaniTreninzi] = useState([])
    const [greska, setGreska] = useState(false)

    const [novaLozinka, setNova] = useState(false)
    const pass = useRef('')
    const [isLoading, setIsLoading] = useState(false)
    //console.log(user)

    useEffect(() => {
        GetData("http://localhost:8800/api/korisnik/vidiClanarinu/" + user.korisnikId, setClanarina, setGreska, setIsLoading)
        GetData("http://localhost:8800/api/korisnik/vidiNapredak/" + user.korisnikId, setNapredak, setGreska, setIsLoading)
        GetData("http://localhost:8800/api/korisnik/vidiZakazaneTreninge/" + user.korisnikId, setZakazaniTreninzi, setGreska, setIsLoading)

    }, [])

    const odjaviKorisnika = () => {
        dispatch({ tip: "ODJAVI" })
    }

    const otkaziIzmenu = () => {
        setIzmena(true)
        setNova(false)
    }

    const zakaziTrening = () => {
        setNoviTrening(true)
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
                <p>{tekst}
                    <input type='password' placeholder="lozinka" ref={pass} />
                </p>
                <button onClick={OKonClick}>Ok</button>
                <button onClick={otkaziIzmenu}>Otkazi</button>
            </div>)
    }

    const izmeniTrening = (idTreninga) => {

        // axios.put('http://localhost:8800/api/korisnik/izmeniTrening/' + user.korisnikId + '/' + idTreninga, {
        //     //trening ?? sta menjam?? 
        // }).then((p) => {
        //     if (p.status === 200) {
        //         console.log(p)
        //         alert('Uspesno izmenjen trening')
        //     }
        // }).catch((error) => {
        //     if (error.response.status)
        //         alert(error.response.data)
        //     else
        //         alert('Doslo je do greske')
        // });
    }

    const otkaziTrening = (idTreninga) => {
        // axios.put('http://localhost:8800/api/korisnik/ukiniTrening/' + idTreninga,)
        //     .then((p) => {
        //         if (p.status === 200) {
        //             console.log(p)
        //             alert('Uspesno ukinut trening')
        //         }
        //     }).catch((error) => {
        //         if (error.response.status)
        //             alert(error.response.data)
        //         else
        //             alert('Doslo je do greske')
        //     });
    }

    let korisnik = user.tip === 'Korisnik'

    return (
        <div className='profilKorisnika'>
            {isLoading && <CircularProgress size='2rem' disableShrink />}

            <div className="infoOProfilu" >

                {!user && <p>nema korisnika</p>}
                <button className="btnOdjavi" onClick={odjaviKorisnika}>Odjavi se</button>
                <h3>{user.ime} {user.prezime}</h3>
                <p>Clanarina vazi do: {clanarina.trajanje}</p>
                <p>Clanarina: {clanarina.cena}</p>
                <p>Godine: {user.godine}</p>
                <p>e-mail: {user.email}</p>
                <p>Broj telefona: {user.brojTelefona}</p>
                <p>Visina: {user.visina}</p>
                <p>Zeljena tezina: {user.zeljenaTezina}</p>
                <p>Zeljeni procenat masti: {user.zeljeniProcenatMasti}</p>
                <p>Zeljeni procenat proteina: {user.zeljeniProcenatProteina}</p>
                <p>Zeljena tezina misica: {user.zeljenaTezinaMisica}</p>

                {izmena && <button onClick={() => { setIzmena(false) }}>Promeni lozinku</button>}
                {!izmena && <div>

                    {!novaLozinka && <Lozinka tekst='Unesite staru lozinku:' OKonClick={proveriLozinku} />}
                    {novaLozinka && <Lozinka tekst='Unesite novu lozinku:' OKonClick={izmeniLozinku} />}

                </div>}

            </div>

            {
                korisnik && <div>
                    <div className="infoNapredak">
                        <h3>Informacije sa poslednjeg merenja</h3>

                        {
                            napredak &&
                            <div >
                                <p>Tezina: {napredak.tezina}</p>
                                <p>Procenat masti: {napredak.procenatMasti}</p>
                                <p>Procenat proteina: {napredak.procenatProteina}</p>
                                <p>Tezina misica: {napredak.tezinaMisica}</p>
                                <p>Procenat vode: {napredak.procenatVode}</p>
                                <p>Kostana masa: {napredak.kostanaMasa}</p>
                                <p>BMI: {napredak.BMI}</p>
                                <p>BodyAge: {napredak.bodyAge}</p>
                            </div>
                        }

                    </div>

                    <div className="zakazaniTreninzi">

                        <h3>Vasi zakazani treninzi</h3>
                        <p>Trener:</p>
                        <p>Datum</p>
                        <p>Vreme:</p>
                        <p>Trajanje:</p>
                        <p>Tip:</p>
                        <p>Intenzitet:</p>
                        <p>Grupni/personalni:</p>
                        <p>online</p>

                        <button onClick={izmeniTrening}>Izmeni trening</button>
                        <button onClick={otkaziTrening}>Otkazi trening</button>


                        {/* {treninzi.map((tr, i) => (
                            <div key={i}>
                                <p>Trener: {tr.trener}</p>
                                <p>Datum: {tr.datum}</p>
                                <p>Vreme: {tr.vreme}</p>
                                <p>Trajanje: {tr.trajanje}</p>
                                <p>Tip: {tr.tip}</p>
                                <p>Intenzitet: {tr.intenzitet}</p>
                                <p>Grupni/personalni: {tr.tip}</p>
                                <p>online:</p>

                                <button onClick={izmeniTrening.bind(undefined, tr.id)}>Izmeni trening</button>
                                <button onClick={otkaziTrening.bind(undefined, tr.id)}>Otkazi trening</button>
                            </div>
                        ))} */}

                        <div className="btnNoviTrening">
                            <button onClick={zakaziTrening}>Zakazi novi trening</button>
                        </div>

                        {/* {noviTrening && <Modal onClose={() => setNoviTrening(false)}>
                            <div>
                            ovede treba nekako trener i nesto to
                            </div>
                            <FormaZakazi onClose={() => setNoviTrening(false)} />
                        </Modal>} */}

                    </div>
                </div>
            }

            {
                !korisnik && <div>
                    <h3>Hvala na registraciji, sacekajte da Vam uprava verifikuje nalog</h3>
                </div>
            }

        </div >
    )
}

export default Korisnik