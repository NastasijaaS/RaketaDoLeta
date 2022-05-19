import '../styles/loginForma.css'
import { useState } from "react";
import { PostMetoda } from './Fetch';
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

        if (ime.current.value === '' || ime.current.value.length < 5) {
            setGreska((greska) => ({ ...greska, ime: true }))
            pom = false
        }

        if (prezime.current.value === '' || prezime.current.value.length < 5) {
            setGreska((greska) => ({ ...greska, prezime: true }))
            pom = false
        }

        if (brojTelefona.current.value == '' || brojTelefona.current.value.length < 9) {
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
                    'ime': ime, 'prezime': prezime,
                    'brojTelefona': brojTelefona,
                    'email': email, 'username': username, 'password': lozinka
                }
            }

            PostMetoda(zahtev, dispatch)

        }
    }

    return (
        <div className="forma">
            <form className="login" id='prijava' onSubmit={upis}>
                <h2>Registrujte se:</h2>

                <label>Ime:
                    <input className='loginInp' ref={ime}
                        type='text' placeholder='ime' />
                </label>

                {greska.ime && <p className='greska'>Polje ime ne sme biti prazno i mora sadrzati najmanje 5 slova</p>}

                <label>Prezime:
                    <input className='loginInp' ref={prezime}
                        type='text' placeholder='prezime' />
                </label>

                {greska.prezime && <p className='greska'>Polje prezime ne sme biti prazno i mora sadrzati najmanje 5 slova</p>}

                <label>Username: <input className='loginInp' ref={username}
                    type='text' placeholder='username' /></label>

                {greska.username && <p className='greska'>Polje username ne sme biti prazno i mora sadrzati najmanje 4 karaktera</p>}

                <label>E-mail: <input className='loginInp' ref={email}
                    type='email' placeholder='e-mail' />
                </label>

                {greska.mail && <p className='greska'>Unesite ispravan mail</p>}

                <label>Lozinka: <input className='loginInp' ref={lozinka}
                    minLength='6'
                    type='password' placeholder='lozinka' />
                </label>

                {greska.lozinka && <p className='greska'>Polje "lozinka" ne sme biti prazno i mora sadrzati najmanje 6 karaktera</p>}

                <label>Broj brojina:
                    <input className='loginInp' ref={brojTelefona}
                        type='number' placeholder='brojTelefona' /></label>

                {greska.brojTelefona && <p className='greska'>Broj telefona mora imati najmanje 9 cifara</p>}

                <button onClick={upis}>Registruj se</button>

            </form>
        </div >

    )
}

export default Register