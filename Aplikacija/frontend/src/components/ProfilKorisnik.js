import Input from "./Input"
import { useState, useContext, useEffect, useRef } from "react";
import { UserContext } from '../context/UserContext';
import { GetData } from './Fetch'
import FormaZakazi from './FormaZakazi'
import Modal from './Modal'

const k = {
    ime: 'ime', prezime: 'prezime', brojTelefona: '0625454545', email: 'mail',
    clanarina: '22.3.2022', visina: '178', brojGodina: '22',
    zeljenaTezina: '60', zeljeniProcenatMasti: '', zeljeniProcenatProteina: '', zeljenaTezinaMisica: ''
}

const n = {
    tezina: '60', procenatMasti: '22', BMI: '22', kostanaMasa: '22',
    procenatProteina: '22', tezinaMisica: '22', procenatVode: '22', bodyAge: '22'
}

const Korisnik = (props) => {

    const { user, dispatch } = useContext(UserContext);
    const [izmena, setIzmena] = useState(true)
    const [noviTrening, setNoviTrening] = useState(false)

    const [brojTelefona, setBrojTelefona] = useState(user.brojTelefona)
    const [lozinka, setLozinka] = useState(user.password)

    const [clanarina, setClanarina] = useState({ datumDo: '', cena: '' })
    const [napredak, setNapredak] = useState([])
    const [zakazaniTreninzi, setZakazaniTreninzi] = useState([])
    const [greska, setGreska] = useState(false)

    console.log(user)

    useEffect(() => {
        GetData("http://localhost:8800/api/korisnik/vidiClanarinu/" + user.korisnikId, setClanarina, setGreska)
        GetData("http://localhost:8800/api/korisnik/vidiNapredak/" + user.korisnikId, setNapredak, setGreska)
        GetData("http://localhost:8800/api/korisnik/vidiZakazaneTreninge/" + user.korisnikId, setZakazaniTreninzi, setGreska)
        console.log(napredak)
        console.log(clanarina)
    }, [])

    //otkazi/izmeni trening

    const izmeniKorisnika = () => {

        //validacija

        //baza

        const zahtev = {
            url: '',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: {

                'brojTelefona': brojTelefona,
                'lozinka': lozinka
            }
        }

        // const data = PostMetoda(zahtev, dispatch)

    }

    const odjaviKorisnika = () => {
        dispatch({ tip: "ODJAVI" })
    }

    const otkaziIzmenu = () => {
        setBrojTelefona(user.brojTelefona)
        setLozinka(user.password)
        setIzmena(true)
    }

    const zakaziTrening = () => {
        setNoviTrening(true)
    }

    let korisnik = user.tip === 'Korisnik'

    return (
        <div className='profilKorisnika'>

            <div className="infoOProfilu" >

                {!user && <p>nema korisnika</p>}

                <button className="btnOdjavi" onClick={odjaviKorisnika}>Odjavi se</button>

                <h3>{user.ime} {user.prezime}</h3>

                <p>Clanarina vazi do: {clanarina.trajanje}</p>
                <p>Clanarina: {clanarina.cena}</p>

                <p>Godine: {user.godine}</p>
                <p>e-mail: {user.email}</p>

                <Input ime='brojTelefona' label='Broj telefona'
                    input={{
                        type: 'number',
                        value: brojTelefona,
                        disabled: izmena,
                        onChange: (ev) => { setBrojTelefona(ev.target.value) }
                    }} />

                <p>Visina: {user.visina}</p>
                <p>Zeljena tezina: {user.zeljenaTezina}</p>
                <p>Zeljeni procenat masti: {user.zeljeniProcenatMasti}</p>
                <p>Zeljeni procenat proteina: {user.zeljeniProcenatProteina}</p>
                <p>Zeljena tezina misica: {user.zeljenaTezinaMisica}</p>

                {izmena && <button onClick={() => { setIzmena(false) }}>Izmeni</button>}

                {!izmena && <button onClick={izmeniKorisnika}>Ok</button>}

                {!izmena && <button onClick={otkaziIzmenu}>Otkazi</button>}
            </div>

            {korisnik && <div>
                <div className="infoNapredak">
                    <h3>Informacije sa poslednjeg merenja</h3>
                    <p>Tezina: {n.tezina}</p>
                    <p>Procenat masti: {n.procenatMasti}</p>
                    <p>Procenat proteina: {n.procenatProteina}</p>
                    <p>Tezina misica: {n.tezinaMisica}</p>
                    <p>Procenat vode: {n.procenatVode}</p>
                    <p>Kostana masa: {n.kostanaMasa}</p>
                    <p>BMI: {n.BMI}</p>
                    <p>BodyAge: {n.bodyAge}</p>
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


                    <div className="btnNoviTrening">
                        <button onClick={zakaziTrening}>Zakazi novi trening</button>
                    </div>

                    {noviTrening && <Modal onClose={() => setNoviTrening(false)}>
                        <div>
                        </div>
                        <FormaZakazi />
                    </Modal>}

                </div>
            </div>}

            {!korisnik && <div>
                <h3>Hvala na registraciji, sacekajte da Vam uprava verifikuje nalog</h3>
            </div>}

        </div>
    )
}

export default Korisnik