import '../styles/loginForma.css'
import { useState, useEffect } from "react";
import { LoginMetoda, PostMetoda } from '../komponente/Fetch';
import { useContext, useRef } from 'react';
import { UserContext } from '../context/UserContext';
import CircularProgress from '@mui/material/CircularProgress';
import { Button, TextField, Box } from '@mui/material';
import { useNavigate } from "react-router-dom";
import DodajTrenera from '../komponente/DodajTrenera'
import Info from '../komponente/Info'

const Register = (props) => {

    const { user, ucitavaSe, error, dispatch } = useContext(UserContext);

    const [greska, setGreska] = useState(
        {
            ime: false,
            prezime: false,
            mail: false,
            lozinka: false,
            brojTelefona: false,
            username: false
        });

    const ime = useRef('')
    const prezime = useRef('')
    const email = useRef('')
    const lozinka = useRef()
    const brojTelefona = useRef()
    const username = useRef()

    let idTrenera = 0

    let navigate = useNavigate()

    const [data, setData] = useState('')
    const [greskaa, setGreskaa] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const [success, setSuccess] = useState(false)



    const upis = async (ev) => {

        ev.preventDefault()

        setGreska({ ime: false, prezime: false, mail: false, lozinka: false, brojTelefona: false, username: false })

        let pom = true;

        if (ime.current.value === '' || ime.current.value.length < 4) {
            setGreska((greska) => ({ ...greska, ime: true }))
            pom = false
        }

        if (prezime.current.value === '' || prezime.current.value.length < 4) {
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
                    'email': email.current.value, 'username': username.current.value, 'password': lozinka.current.value,
                    tipKorisnika: user ? 'Trener' : ''
                }
            }

            user ? await PostMetoda(zahtev, setData, setGreskaa, setIsLoading) : await LoginMetoda(zahtev, dispatch, setGreskaa)

            if (greskaa) {
                alert(greskaa)
                return
            }

            setSuccess(true)

            // if (user) {
            //     localStorage.setItem("idTrenera", JSON.stringify(data._id))
            // }

        }
    }

    useEffect(() => {
        sessionStorage.setItem("idTrenera", JSON.stringify(data._id))
    }, [data])

    // const Info = ({ labela, tip, reff, err, tekst }) => {
    //     return (
    //         <div>
    //             <TextField
    //                 sx = {{maxWidth:300}}
    //                 error={err}
    //                 className='loginInp'
    //                 inputRef={reff}
    //                 label={labela}
    //                 type={tip}
    //                 color="primary"
    //                 size="small"
    //                 placeholder={tekst}
    //                 // helperText={tekst}
    //                 focused />
    //         </div>
    //     )
// }


// const FormaRegistruj = () => {
//     return (
//         <div className="login">
//             <h2>Registrujte se:</h2>

//             <Info labela='Ime' tip='text' reff={ime} err={greska.ime} />
//             {greska.ime && <span className='greska'>Polje ime ne sme biti prazno i mora sadrzati najmanje 3 slova</span>}

//             <Info labela='Prezime' tip='text' reff={prezime} />
//             {greska.prezime && <span className='greska'>Polje prezime ne sme biti prazno i mora sadrzati najmanje 4 slova</span>}

//             <Info labela='E-mail' tip='email' reff={email} />
//             {greska.mail && <span className='greska'>Unesite ispravan mail</span>}

//             <Info labela='Username' tip='text' reff={username} />
//             {greska.username && <span className='greska'>Polje username ne sme biti prazno i mora sadrzati najmanje 4 karaktera</span>}

//             <Info labela='Lozinka' tip='password' reff={lozinka} />
//             {greska.lozinka && <span className='greska'>Polje "lozinka" ne sme biti prazno i mora sadrzati najmanje 6 karaktera</span>}

//             <Info labela='Broj telefona' tip='text' reff={brojTelefona} />
//             {greska.brojTelefona && <span className='greska'>Broj telefona mora imati najmanje 9 cifara</span>}
//         </div>
//     )
// }


return (
    <div className="forma">
        {ucitavaSe && <CircularProgress size='2rem' disableShrink />}

        {!success &&
            <form className="login" onSubmit={upis}>

                <div className="login">
                    <h2>Registrujte se:</h2>

                    <Info labela='Ime*' tip='text' reff={ime} err={greska.ime} tekst='najmanje 3 slova' />

                    <Info labela='Prezime*' tip='text' reff={prezime} err={greska.prezime} tekst='najmanje 4 slova' />
                    {/* {greska.prezime && <span className='greska'>Polje prezime ne sme biti prazno i mora sadrzati najmanje 4 slova</span>} */}

                    <Info labela='E-mail*' tip='email' reff={email} err={greska.mail} tekst='mail@gmail.com' />
                    {/* {greska.mail && <span className='greska'>Unesite ispravan mail</span>} */}

                    <Info labela='Username*' tip='text' reff={username} err={greska.username} tekst='najmanje 4 karaktera' />
                    {/* {greska.username && <span className='greska'>Polje username ne sme biti prazno i mora sadrzati najmanje 4 karaktera</span>} */}

                    <Info labela='Lozinka*' tip='password' reff={lozinka} err={greska.lozinka} tekst='najmanje 6 karaktera' />
                    {/* {greska.lozinka && <span className='greska'>Polje "lozinka" ne sme biti prazno i mora sadrzati najmanje 6 karaktera</span>} */}

                    <Info labela='Broj telefona*' tip='text' reff={brojTelefona} err={greska.brojTelefona} tekst='+381 623 212 123' />
                    {/* {greska.brojTelefona && <span className='greska'>Broj telefona mora imati najmanje 9 cifara</span>} */}
                </div>

                <Button size='small' variant="contained" onClick={upis}>Registruj se</Button>
            </form>}

        {success && <div>animacina success</div>}

    </div >

)
}

export default Register