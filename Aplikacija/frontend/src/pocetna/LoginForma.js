import '../styles/loginForma.css'
import { useState, useContext, useRef } from "react";
import { UserContext } from '../context/UserContext';
import { LoginMetoda } from '../komponente/Fetch';
import CircularProgress from '@mui/material/CircularProgress'
import { Button, TextField, Box, Typography } from '@mui/material';
import Greska from '../komponente/Alert';
import { LoginSuccess, LoginFailure, LoginStart } from '../context/UserActions.js'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const LogIn = (props) => {

    let navigate = useNavigate()
    const { ucitavaSe, error, dispatch } = useContext(UserContext);
    const [greska, setGreska] = useState({ mail: false, lozinka: false });
    const [alert, setAlert] = useState({ prikazi: false, tip: 'error', greska: '' })

    const [mail, setMail] = useState('');
    const [lozinka, setLozinka] = useState('');

    const proveriMail = (mail) => {

        const Email = "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$";

        if (mail === '' || !mail.match(Email)) {
            setGreska((greska) => ({ ...greska, mail: true }))
        }
        else {
            setGreska((greska) => ({ ...greska, mail: false }))
            setMail(mail)
        }
    }
    const proveriPass = (lozinka) => {
        if (lozinka === '' || lozinka.length < 5) {
            setGreska((greska) => ({ ...greska, lozinka: true }))
        }
        else{
            setGreska((greska) => ({ ...greska, lozinka: false }))
        }
    }

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

        if (pom === true) {

            let nesto = ''

            await axios.post('http://localhost:8800/api/auth/login', {
                'email': mail, 'password': lozinka
            }).then((p) => {
                if (p.status === 200) {
                    dispatch(LoginSuccess(p.data))
                    console.log(p.data)
                    localStorage.setItem('token',p.data?.token)
                }
            }).catch((error) => {
                if (error.response.status === 404) {
                    nesto = 'Ne postoji takav korisnik'
                }
                else if (error.response.status === 400) {
                    nesto = 'Pogresna lozinka'
                }
                else {
                    nesto = 'doslo je do greske'
                }

            });

            if (nesto !== '') {
                setAlert({ prikazi: true, tip: 'error', greska: nesto })
            }
            setGreska({ mail: false, lozinka: false })

            if (props.onClose)
                props.onClose()
        }
    }

    return (
        <Box className="forma cardCenter marginB">
            <form className="login" >
                <Greska
                    open={alert.prikazi}
                    onClose={() => setAlert({ prikazi: false, tip: 'success', greska: '' })}
                    tip={alert.tip}
                    greska={alert.greska}
                />

                <Typography variant="h5" component="div" sx={{ textAlign: 'center' }}>Prijavite se:</Typography>


                <TextField
                    className='loginInp'
                    value={mail}
                    error={greska.mail}
                    onChange={(ev) => { setMail(ev.target.value); proveriMail(ev.target.value) }}
                    label="E-mail"
                    type="email"
                    color="primary"
                    size="small"
                />

                <TextField
                    className='loginInp'
                    value={lozinka}
                    error={greska.lozinka}
                    onChange={(ev) => { setLozinka(ev.target.value) ; proveriPass(ev.target.value); }}
                    label="Lozinka"
                    type="password"
                    minlenght="6"
                    color="primary"
                    size="small"
                />

                {ucitavaSe && <CircularProgress size='2rem' disableShrink />}

                <Button size='small' variant="contained" onClick={upis}>Prijavi se</Button>

            </form>
        </Box >

    )
}

export default LogIn