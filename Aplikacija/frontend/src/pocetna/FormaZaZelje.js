import '../styles/loginForma.css'
import { PutMetoda } from '../komponente/Fetch';
import { useContext, useRef , useState} from 'react';
import { UserContext } from '../context/UserContext';
import CircularProgress from '@mui/material/CircularProgress';
import { Button, TextField, Box } from '@mui/material';
import { useNavigate } from "react-router-dom";

const Info = ({ labela, tip, reff }) => {
    return (
        <div>
            <TextField
                className='loginInp'
                inputRef={reff}
                label={labela}
                type={tip}
                color="primary"
                size="small"
                placeholder={labela}
                focused />

        </div>
    )
}


const Zelje = () => {
    let navigate = useNavigate()
    const { user, dispatch } = useContext(UserContext);

    const [ucitavaSe, setIsLoading] = useState(false)
    const [greska, setGreska] = useState(false)
    const [data, setData] = useState(false)

    const visina = useRef()
    const tezina = useRef()
    const mast = useRef()
    const proteini = useRef()
    const misici = useRef(0)
    const godine = useRef(0)

    const upis = async () => {
        //   navigate('../profil')
        const zahtev = {
            url: 'http://localhost:8800/api/korisnik/izmeniParametre/' + user.korisnikId,
            body: {
                visina: visina.current.value,
                zeljenaTezina: tezina.current.value,
                zeljenaTezinaMisica: misici.current.value,
                zeljeniProcenatMasti: mast.current.value,
                zeljeniProcenatProteina: proteini.current.value
            }
        }

        await PutMetoda(zahtev, setData, setGreska, setIsLoading)

        const korisnik = {
            brojGodina: godine.current.value,
            visina: visina.current.value,
            zeljenaTezina: tezina.current.value,
            zeljenaTezinaMisica: misici.current.value,
            zeljeniProcenatMasti: mast.current.value,
            zeljeniProcenatProteina: proteini.current.value
        }

        dispatch({ tip: "UPDATE_USER", payload: { ...user, ...korisnik } })
    }

    return (
        <div className="forma">
            <form className="login" id='prijava' onSubmit={upis}>
                <h2>Unesite vase podatke:</h2>

                <Info labela='Godine' defaultValue = {0} tip='number' reff={godine} />

                <Info labela='Visina' defaultValue = {0} tip='number' reff={visina} />

                <Info labela='Zeljena tezina' defaultValue = {0} tip='number' reff={tezina} />

                <Info labela='Zeljeni procenat masti' defaultValue = {0} tip='email' reff={mast} />

                <Info labela='Zeljeni procenat proteina' defaultValue = {0} tip='number' reff={proteini} />

                <Info labela='Zeljeni tezina misica' defaultValue = {0} tip='number' reff={misici} />

                {ucitavaSe && <CircularProgress size='2rem' disableShrink />}

                <Button size='small' variant="contained" onClick={upis}>Unesi</Button>

            </form>
        </div >

    )
}

export default Zelje