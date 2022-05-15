import '../styles/loginForma.css'
import { useState } from "react";

const LogIn = (props) => {

    const prijava = props.prijava === 'true';

    const [ime, setIme] = useState({ naziv: '', greska: '' });
    const [prezime, setPrezime] = useState({ naziv: '', greska: '' });
    const [email, setEmail] = useState({ naziv: '', greska: '' });
    const [lozinka, setLozinka] = useState({ naziv: '', greska: '' });
    const [godine, setGodine] = useState({ god: -1, greska: '' });

    const upis = (ev) => {

        let pom = true;

        // console.log(ime)
        // console.log(prezime)
        // console.log(email)
        // console.log(lozinka)
        // console.log(godine)

        if (prijava) {
            ev.preventDefault();

            if (ime.naziv === '' || ime.naziv.length < 5) {
                setIme({ naziv: '', greska: 'Polje ime ne sme biti prazno i mora sadrzati najmanje 5 slova' })
                pom = false
            }

            if (prezime.naziv === '' || prezime.naziv.length < 5) {
                setPrezime({ naziv: '', greska: 'Polje prezime ne sme biti prazno i mora sadrzati najmanje 5 slova' })
                pom = false
            }

            if (godine.god != -1 && godine.god != '' && parseInt(godine.god) < 15) {
                setGodine({ god: -2, greska: 'Morate imati vise od 15 godina' })
                pom = false
            }

        }

        if (email.naziv === '') {
            setEmail({ naziv: '', greska: 'Unesite ispravnu email adresu' })
            pom = false
            ev.preventDefault();
        }

        if (lozinka.naziv === '' || lozinka.naziv.length < 6) {
            setLozinka({ naziv: '', greska: 'Polje lozinka ne sme biti prazno i mora sadrzati najmanje 6 karaktera ' })
            pom = false
            ev.preventDefault();
        }

        if (pom === true) {
            
            console.log("ispravno")
        }
        //baza

    }

    return (
        <div className="forma">
            <form className="login" id='prijava' onSubmit={upis}>
                {prijava && <h2>Registrujte se:</h2>}
                {!prijava && <h2>Prijavite se:</h2>}

                {prijava && <label>Ime:
                    <input className='loginInp' value={ime.naziv} onChange={e => setIme({ naziv: e.target.value, greska: '' })} type='text' placeholder='ime' /></label>}

                {ime.greska !== '' && <p className='greska'> {ime.greska}</p>}

                {prijava && <label>Prezime:
                    <input className='loginInp' onBlur={e => setPrezime({ naziv: e.target.value, greska: '' })} type='text' placeholder='prezime' /></label>}

                {prezime.greska !== '' && <p className='greska'> {prezime.greska}</p>}

                <label>E-mail: <input className='loginInp' value={email.naziv } onChange={e => setEmail({ naziv: e.target.value, greska: '' })} type='mail' placeholder='e-mail' /></label>

                {email.greska !== '' && <p className='greska'> {email.greska}</p>}

                <label>Lozinka: <input className='loginInp' onBlur={e => setLozinka({ naziv: e.target.value, greska: '' })} type='password' placeholder='lozinka' /></label>

                {lozinka.greska !== '' && <p className='greska'> {lozinka.greska}</p>}

                {prijava && <label>Broj godina:
                    <input className='loginInp' onBlur={e => setGodine({ god: e.target.value, greska: '' })} type='number' placeholder='godine' /></label>}

                {godine.god === -2 && <p className='greska'> {godine.greska}</p>}


                {prijava && <button>Registruj se</button>}
                {!prijava && <button>Prijavi se</button>}
                {/* <button>Otkazi</button> */}
            </form>
        </div >

    )
}

export default LogIn