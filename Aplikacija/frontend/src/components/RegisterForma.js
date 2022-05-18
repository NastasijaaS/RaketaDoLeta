import '../styles/loginForma.css'
import { useState } from "react";

const noviNalog = async (ime, prezime, brojTelefona, mail, username, pass) => {
    console.log('novi nalog')

    await fetch("http://localhost:8800/api/auth/registe", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: username,
            password: pass
        })
    })
        .then(p => {
            p.json()
                .then(data => {
                    if (p.ok) {

                        console.log('uspresno prijavljivanje')
                    }
                    else {
                        console.log("Bad request");
                        throw new Error("Nema korisnika sa tim registovanim username!");

                    }

                })

        }).catch(error => {
            console.log(error)

        });

}

const Register = (props) => {

    const [ime, setIme] = useState({ naziv: '', greska: '' });
    const [prezime, setPrezime] = useState({ naziv: '', greska: '' });
    const [email, setEmail] = useState({ naziv: '', greska: '' });
    const [lozinka, setLozinka] = useState({ naziv: '', greska: '' });
    const [brojTelefona, setBrojTelefona] = useState({ broj: '', greska: '' });
    const [username, setUsername] = useState({ naziv: '', greska: '' });

    const upis = (ev) => {

        ev.preventDefault()

        let pom = true;

        // console.log(ime)
        // console.log(prezime)
        // console.log(email)
        // console.log(lozinka)
        // console.log(brojTelefona)



        if (ime.naziv === '' || ime.naziv.length < 5) {
            setIme({ naziv: ime.naziv, greska: 'Polje ime ne sme biti prazno i mora sadrzati najmanje 5 slova' })
            pom = false
        }

        if (prezime.naziv === '' || prezime.naziv.length < 5) {
            setPrezime({ naziv: prezime.naziv, greska: 'Polje prezime ne sme biti prazno i mora sadrzati najmanje 5 slova' })
            pom = false
        }

        if (brojTelefona.broj == -1 || brojTelefona.broj == '' || brojTelefona.broj.length < 9) {
            setBrojTelefona({ broj: brojTelefona.broj, greska: 'Unesite ispravan broj' })
            pom = false
        }

        const mail = "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$";

        if (email.naziv === '' || !email.naziv.match(mail)) {
            setEmail({ naziv: email.naziv, greska: 'Unesite ispravnu email adresu' })
            pom = false
        }



        if (lozinka.naziv === '' || lozinka.naziv.length < 6) {
            setLozinka({ naziv: lozinka.naziv, greska: 'Polje lozinka ne sme biti prazno i mora sadrzati najmanje 6 karaktera ' })
            pom = false
        }

        if (username.naziv === '' || username.naziv.length < 6) {
            setUsername({ naziv: username.naziv, greska: 'Polje username ne sme biti prazno i mora sadrzati najmanje 6 karaktera ' })
            pom = false
        }

        if (pom === true) {
            //  console.log("ispravno")

            noviNalog(ime.naziv, prezime.naziv, brojTelefona.broj, email.naziv, username.naziv, lozinka.naziv)

            setIme({ naziv: '', greska: '' })
            setPrezime({ naziv: '', greska: '' })
            setBrojTelefona({ broj: '', greska: '' })
            setEmail({ naziv: '', greska: '' })
            setLozinka({ naziv: '', greska: '' })
            setUsername({ naziv: '', greska: '' })
        }
    }

    return (
        <div className="forma">
            <form className="login" id='prijava' onSubmit={upis}>
                <h2>Registrujte se:</h2>


                <label>Ime:
                    <input className='loginInp' value={ime.naziv}
                        onChange={e => setIme({ naziv: e.target.value, greska: '' })}
                        type='text' placeholder='ime' />
                </label>

                {ime.greska !== '' && <p className='greska'> {ime.greska}</p>}

                <label>Prezime:
                    <input className='loginInp' value={prezime.naziv}
                        onChange={e => setPrezime({ naziv: e.target.value, greska: '' })}
                        type='text' placeholder='prezime' />
                </label>

                {prezime.greska !== '' && <p className='greska'> {prezime.greska}</p>}

                <label>E-mail: <input className='loginInp' value={email.naziv}
                    onChange={e => setEmail({ naziv: e.target.value, greska: '' })}
                    type='email' placeholder='e-mail' />
                </label>

                {email.greska !== '' && <p className='greska'> {email.greska}</p>}

                <label>Username: <input className='loginInp' value={username.naziv}
                    onChange={e => setUsername({ naziv: e.target.value, greska: '' })}
                    type='text' placeholder='username' /></label>

                {username.greska !== '' && <p className='greska'> {username.greska}</p>}

                <label>Lozinka: <input className='loginInp' value={lozinka.naziv}
                    onChange={e => setLozinka({ naziv: e.target.value, greska: '' })}
                    minLength='6'
                    type='password' placeholder='lozinka' />
                </label>

                {lozinka.greska !== '' && <p className='greska'> {lozinka.greska}</p>}

                <label>Broj brojina:
                    <input className='loginInp' value={brojTelefona.broj}
                        onChange={e => setBrojTelefona({ broj: e.target.value, greska: '' })}
                        type='number' placeholder='brojTelefona' /></label>

                {brojTelefona.greska != '' && <p className='greska'> {brojTelefona.greska}</p>}


                <button>Registruj se</button>

                {/* <button>Otkazi</button> */}
            </form>
        </div >

    )
}

export default Register