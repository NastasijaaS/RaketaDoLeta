import '../../styles/Pocetna.css'
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { HashLink } from 'react-router-hash-link';
import { UserContext } from '../../context/UserContext';

function Header() {

    function meni(event) {

        let x = document.getElementById("heder");

        if (x.className === "zaglavlje") {
            x.className += " show";
        } else {
            x.className = "zaglavlje";
        }
        event.preventDefault();
    }

    const { user } = useContext(UserContext);

    return (
        <header className="zaglavlje" id="heder">
            <div id='zaglavlje' >
                <Link to='/pocetna'>
                    <span className='levo pocetna'>Početna</span>
                </Link>
                <Link to='/treneri'>
                    <span className='levo treneri'>Treneri</span>
                </Link>
                <Link to='/usluge'>
                    <span className='levo usluge'>Trenirajte sa nama</span>
                </Link>
                <Link to='/onama'>
                    <span className='levo onama'>O nama</span>
                </Link>
                <HashLink to='#kontakt'>
                    <span className='levo kontakt'>Kontakt</span>
                </HashLink>

                <Link to='/blog'>
                    <span className='levo blog'>Blog</span>
                </Link>

                <Link to='/login'>
                    {!user && <span className='desno login'>Log in</span>}
                </Link>
                <Link to='/signup'>
                    {!user && <span className='desno signup'>Sign up</span>}
                </Link>

                <Link to='/profil'>
                    {user && <span className='desno profil'>Profil</span>}
                </Link>

            </div>

            <span className="icon" onClick={meni}>
                <div className='menu'></div>
                <div className='menu'></div>
                <div className='menu'></div>
            </span>
        </header>
    )
}
const Footer = () => {
    return (
        <footer className="footer" id="kontakt">
            <div className="fKontakt">
                <span>Fitnes centar RaketaDoLeta</span>
                <span>Pronađite nas na adresi: <a href="https://goo.gl/maps/Akp9XkeKBDunKv41A">Ul. "Neki kralj Zajebani"</a></span>
                <span>✉ Pišite nam na mejl: <a href="mailto:gym@elfak.rs">gym@elfak.rs</a></span>
                <span>☎ Ili nas kontaktirajte na broj telefona: <a href="#">+381 69 691864</a></span>
            </div>
        </footer>
    )
}

const Pocetna = () => {
    //const toTop = () => window.scrollTo(0,0)

    return (<div className='glavniDiv'>
        <h1> nesto.</h1>
        <div>
            <p> jos nesto </p>
        </div>
    </div>)
}

export { Header, Footer, Pocetna }