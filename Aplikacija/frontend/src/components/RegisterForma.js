import '../styles/loginForma.css'
import { useState } from "react";
import { LoginMetoda } from './Fetch';
import { useContext, useRef } from 'react';
import { UserContext } from '../context/UserContext';

const Register = (props) => {

    const { user, ucitavaSe, dispatch } = useContext(UserContext);

    const [greska, setGreska] = useState({ ime: false, prezime: false, mail: false, lozinka: false, brojTelefona: false, username: false });

    const ime = useRef('')
    const prezime = useRef('')
    const email = useRef('')
    const lozinka = useRef()
    const brojTelefona = useRef()
    const username = useRef()

    const upis = (ev) => {

        ev.preventDefault()

        setGreska({ ime: false, prezime: false, mail: false, lozinka: false, brojTelefona: false, username: false })

        let pom = true;

        if (ime.current.value === '' || ime.current.value.length < 4) {
            setGreska((greska) => ({ ...greska, ime: true }))
            pom = false
        }

        if (prezime.current.value === '' || prezime.current.value.length < 5) {
            setGreska((greska) => ({ ...greska, prezime: true }))
            pom = false
        }

        if (brojTelefona.current.value == '' || (brojTelefona.current.value.length < 9 && brojTelefona.current.value.length < 12)) {
            setGreska((greska) => ({ ...greska, brojTelefona: true }))
            pom = false
        }

        const mail = "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$";

        if (email.current.value === '' || !email.current.value.match(mail)) {
            setGreska((greska) => ({ ...greska, mail: true }))
            pom = false
        }

        if (lozinka.current.value === '' || lozinka.current.value.length < 6) {
            setGreska((greska) => ({ ...greska, lozinka: true }))
            pom = false
        }


        if (username.current.value === '' || username.current.value.length < 4) {
            setGreska((greska) => ({ ...greska, username: true }))
            pom = false
        }

        if (pom === true) {

            const zahtev = {
                url: 'http://localhost:8800/api/auth/register',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: {
                    'ime': ime.current.value, 'prezime': prezime.current.value,
                    'brojTelefona': brojTelefona.current.value,
                    'email': email.current.value, 'username': username.current.value, 'password': lozinka.current.value
                }
            }

            LoginMetoda(zahtev, dispatch, setGreska)

        }
    }

    const Info = ({ labela, tip, reff }) => {
        return (
            <div>
                <label>{labela}:
                    <input className='loginInp' ref={reff}
                        type={tip} placeholder={labela} />
                </label>
            </div>
        )
    }

    return (
        <div className="forma">
            <form className="login" id='prijava' onSubmit={upis}>
                <h2>Registrujte se:</h2>

                <Info labela='Ime' tip='text' reff={ime} />
                {greska.ime && <p className='greska'>Polje ime ne sme biti prazno i mora sadrzati najmanje 3 slova</p>}

                <Info labela='Prezime' tip='text' reff={prezime} />
                {greska.prezime && <p className='greska'>Polje prezime ne sme biti prazno i mora sadrzati najmanje 4 slova</p>}

                <Info labela='Username' tip='text' reff={username} />
                {greska.username && <p className='greska'>Polje username ne sme biti prazno i mora sadrzati najmanje 4 karaktera</p>}

                <Info labela='E-mail' tip='email' reff={email} />
                {greska.mail && <p className='greska'>Unesite ispravan mail</p>}

                <Info labela='Lozinka' tip='password' reff={lozinka} />
                {greska.lozinka && <p className='greska'>Polje "lozinka" ne sme biti prazno i mora sadrzati najmanje 6 karaktera</p>}

                <Info labela='Broj telefona' tip='text' reff={brojTelefona} />
                {greska.brojTelefona && <p className='greska'>Broj telefona mora imati najmanje 9 cifara</p>}

                <button onClick={upis}>Registruj se</button>

            </form>
        </div >

    )
}

export default Register