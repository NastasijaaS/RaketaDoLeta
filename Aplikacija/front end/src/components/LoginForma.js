import Input from "./Input"
import '../styles/loginForma.css'

const LogIn = (props) => {

    const prijava = props.prijava === 'true';
    return (
        <div className="forma">
           
            <form className="login" id='prijava'>
                {prijava && <h2>Registrujte se:</h2>}
                {!prijava && <h2>Prijavite se:</h2>}
                {prijava && <Input label='Ime: ' input={{ className: '', type: 'text', placeholder: 'ime' }} />}
                {prijava && <Input label='Prezime: ' input={{ className: '', type: 'text', placeholder: 'prezime' }} />}
                <Input label='E-mail: ' input={{ className: '', type: 'mail', placeholder: 'e-mail' }} />
                <Input label='Lozinka: ' input={{ className: '', type: 'password', placeholder: 'lozinka' }} />
                {prijava && <Input label='Broj godina: ' input={{ className: '', type: 'number', placeholder: 'godine' }} />}
                {prijava && <button>Registruj se</button>}
                {!prijava && <button>Prijavi se</button>}
                <button>Otkazi</button>
            </form>
           
        </div>

    )
}

export default LogIn