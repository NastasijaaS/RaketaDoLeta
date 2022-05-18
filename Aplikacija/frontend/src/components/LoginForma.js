import '../styles/loginForma.css'
import { useState, useContext } from "react";
import { UserContext } from '../context/UserContext';


const prijaviKorisnika = async (username, pass, dispatch, user) => {
    console.log(username + '    ' + pass)

    //milica@c.s   milica123
    dispatch({ tip: "LOGIN_START" });

    

    await fetch("http://localhost:8800/api/auth/login", {
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

                        console.log('uspesno prijavljivanje')

                        dispatch({ tip: "LOGIN_SUCCESS", payload: data });

                    }
                })

        }).catch(error => {
            dispatch({ tip: "LOGIN_FAIL", payload: error });
            console.log(error)

        });

}

const LogIn = () => {

    const { user, ucitavaSe,  dispatch } = useContext(UserContext);

    const [email, setEmail] = useState({ naziv: '', greska: '' });
    const [lozinka, setLozinka] = useState({ naziv: '', greska: '' });
    // const [username, setUsername] = useState({ naziv: '', greska: '' });

    const upis = (ev) => {

        ev.preventDefault()
        let pom = true;

        const mail = "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$";

        if (email.naziv === '' || !email.naziv.match(mail)) {
            setEmail({ naziv: email.naziv, greska: 'Unesite ispravnu email adresu' })
            pom = false
        }

        if (lozinka.naziv === '' || lozinka.naziv.length < 6) {
            setLozinka({ naziv: lozinka.naziv, greska: 'Polje lozinka ne sme biti prazno i mora sadrzati najmanje 6 karaktera ' })
            pom = false
        }

        // if (username.naziv === '' || username.naziv.length < 6) {
        //     setUsername({ naziv: username.naziv, greska: 'Polje username ne sme biti prazno i mora sadrzati najmanje 6 karaktera ' })
        //     pom = false
        // }

        if (pom === true) {
            //  console.log("ispravno")

            prijaviKorisnika(email.naziv, lozinka.naziv, dispatch, user)

            setEmail({ naziv: '', greska: '' })
            setLozinka({ naziv: '', greska: '' })
            //  setUsername({ naziv: '', greska: '' })

            //  console.log(user)
            // console.log(ucitavaSe)
            // console.log(dispatch)
        }
    }

    return (
        <div className="forma">
            <form className="login" id='prijava' onSubmit={upis}>

                <h2>Prijavite se:</h2>

                <label>E-mail: <input className='loginInp' value={email.naziv}
                    onChange={e => setEmail({ naziv: e.target.value, greska: '' })}
                    type='email' placeholder='e-mail' />
                </label>

                {email.greska !== '' && <p className='greska'> {email.greska}</p>}
                {/* 
                <label>Username: <input className='loginInp' value={username.naziv}
                    onChange={e => setUsername({ naziv: e.target.value, greska: '' })}
                    type='text' placeholder='username' /></label>

                {username.greska !== '' && <p className='greska'> {username.greska}</p>} */}

                <label>Lozinka: <input className='loginInp' value={lozinka.naziv}
                    onChange={e => setLozinka({ naziv: e.target.value, greska: '' })}
                    minLength='6'
                    type='password' placeholder='lozinka' />
                </label>

                {lozinka.greska !== '' && <p className='greska'> {lozinka.greska}</p>}

                {ucitavaSe ? (
                    <p>ucitavanje</p>
                ) : (
                    <p>ucitano</p>
                )}

                <button>Prijavi se</button>
                {/* <button>Otkazi</button> */}
            </form>
        </div >

    )
}

export default LogIn