import '../styles/loginForma.css'
import { useState, useContext, useRef } from "react";
import { UserContext } from '../context/UserContext';
import { LoginMetoda } from '../komponente/Fetch';
import CircularProgress from '@mui/material/CircularProgress'
import { Button, TextField, Box } from '@mui/material';
import Greska from '../komponente/Alert';
import { LoginSuccess, LoginFailure, LoginStart } from '../context/UserActions.js'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const LogIn = (props) => {

    let navigate = useNavigate()

    const { ucitavaSe, error, dispatch } = useContext(UserContext);

    const [greska, setGreska] = useState({ mail: false, lozinka: false });
    const [alert, setAlert] = useState({ prikazi: false, tip: 'error', greska: '' })


    // const mail = useRef('')
    // const lozinka = useRef('')
    const [mail, setMail] = useState('');
    const [lozinka, setLozinka] = useState('');



    const validacija = () => {

        setGreska({ mail: false, lozinka: false })

        let pom = true
        const Email = "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$";

        if (mail === '' || !mail.match(Email)) {
            setGreska((greska) => ({ ...greska, mail: true }))
            pom = false
        }

        if (lozinka === '' || lozinka.length < 5) {
            setGreska((greska) => ({ ...greska, lozinka: true }))
            pom = false
        }
        return pom
    }

    const upis = async (ev) => {

        ev.preventDefault()

        let pom = validacija();

        // const Email = "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$";

        // if (mail === '' || !mail.match(Email)) {
        //     setGreska((greska) => ({ ...greska, mail: true }))
        //     pom = false
        // }

        // if (lozinka === '' || lozinka.length < 6) {
        //     setGreska((greska) => ({ ...greska, lozinka: true }))
        //     pom = false
        // }

        if (pom === true) {

            let nesto = ''

            await axios.post('http://localhost:8800/api/auth/login', {
                'email': mail, 'password': lozinka
            }).then((p) => {
                if (p.status === 200) {
                    dispatch(LoginSuccess(p.data))
                }
            }).catch((error) => {
                if (error.response.status === 404) {
                    nesto = 'Ne postoji takav korisnik'
                }
                else if (error.response.status === 400) {
                    nesto = 'Pogresna lozinka'
                    // dispatch(LoginFailure(nesto))
                }
                else {
                    nesto = 'doslo je do greske'
                }

            });


            // const zahtev = {
            //     url: 'http://localhost:8800/api/auth/login',
            //     headers: {
            //         'Accept': 'application/json',
            //         'Content-Type': 'application/json'
            //     },
            //     body: { 'email': mail, 'password': lozinka }
            // }

            //  await LoginMetoda(zahtev, dispatch)

            if (nesto !== '') {
                setAlert({ prikazi: true, tip: 'error', greska: nesto })
            }
            setGreska({ mail: false, lozinka: false })

            if (props.onClose)
                props.onClose()
        }
    }

    return (
        <div className="forma">
            <form className="login" >
                <Greska
                    open={alert.prikazi}
                    onClose={() => setAlert({ prikazi: false, tip: 'success', greska: '' })}
                    tip={alert.tip}
                    greska={alert.greska}
                />

                <h2>Prijavite se:</h2>


                <TextField
                    className='loginInp'
                    value={mail}
                    error={greska.mail}
                    onChange={(ev) => { setMail(ev.target.value); validacija() }}

                    label="E-mail"
                    type="email"
                    color="primary"
                    size="small"
                    focused />

                {/* {greska.mail && <p className='greska'>Molimo unesite ispravnu e-mail adresu</p>} */}

                <TextField
                    className='loginInp'
                    value={lozinka}
                    error={greska.lozinka}
                    onChange={(ev) => { validacija(); setLozinka(ev.target.value) }}
                    label="Lozinka"
                    type="password"
                    minlenght="6"
                    color="primary"
                    size="small"
                    focused />

                {/* {greska.lozinka && <p className='greska'>Lozinka mora imati najmanje 6 karaktera</p>} */}

                {ucitavaSe && <CircularProgress size='2rem' disableShrink />}

                <Button size='small' variant="contained" onClick={upis}>Prijavi se</Button>

            </form>
        </div >

    )
}

export default LogIn