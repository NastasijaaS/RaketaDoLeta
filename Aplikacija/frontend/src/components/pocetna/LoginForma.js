import '../../styles/loginForma.css'
import { useState, useContext, useRef } from "react";
import { UserContext } from '../../context/UserContext';
import { LoginMetoda } from '../komponente/Fetch';
import CircularProgress from '@mui/material/CircularProgress'
import { Button, TextField } from '@mui/material';


const LogIn = () => {

    const { ucitavaSe, error, dispatch } = useContext(UserContext);

    const [greska, setGreska] = useState({ mail: false, lozinka: false });

    const mail = useRef('')
    const lozinka = useRef('')

    const upis = async (ev) => {

        ev.preventDefault()
        let pom = true;

        const Email = "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$";

        if (mail.current.value === '' || !mail.current.value.match(Email)) {
            setGreska((greska) => ({ ...greska, mail: true }))
            pom = false
        }

        if (lozinka.current.value === '' || lozinka.current.value.length < 6) {
            setGreska((greska) => ({ ...greska, lozinka: true }))
            pom = false
        }

        if (pom === true) {

            const zahtev = {
                url: 'http://localhost:8800/api/auth/login',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: { 'email': mail.current.value, 'password': lozinka.current.value }
            }

            await LoginMetoda(zahtev, dispatch)

            if (error) {
                alert(error)
                return
            }

            setGreska({ mail: false, lozinka: false })

        }
    }

    return (
        <div className="forma">
            <form className="login" id='prijava' onSubmit={upis}>

                <h2>Prijavite se:</h2>

                 <label>E-mail: <input className='loginInp' ref={mail}
                    type='email' placeholder='e-mail' />
                </label> 
                {/* "<TextField className='loginInp' ref={mail} label="E-mail" type = "email" color="primary"  size = "small" focused /> */}

                {greska.mail && <p className='greska'>Molimo unesite ispravnu e-mail adresu</p>}

                {/* <TextField className='loginInp' ref={lozinka} label="Lozinka" type = "password" minLenght = "6" color="primary"  size = "small" focused /> */}

                <label>Lozinka: <input className='loginInp' ref={lozinka}
                    minLength='6'
                    type='password' placeholder='lozinka' />
                </label> 

                {greska.lozinka && <p className='greska'>Lozinka mora imati najmanje 6 karaktera</p>}

                {ucitavaSe && <CircularProgress size='2rem' disableShrink />}

                <button>Prijavi se</button>

            </form>
        </div >

    )
}

export default LogIn