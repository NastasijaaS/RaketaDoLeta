import '../styles/Pocetna.css'
import React from "react";
import { Link } from "react-router-dom";
import { HashLink } from 'react-router-hash-link';

function Header(props) {

    function meni(event) {

        let x = document.getElementById("heder");

        if (x.className === "zaglavlje") {
            x.className += " show";
        } else {
            x.className = "zaglavlje";
        }
        event.preventDefault();
    }

    return (
        <header className="zaglavlje" id="heder">
            <div id='zaglavlje' >
                <Link to='/pocetna'>
                    <span className='pocetna active'>Početna</span>
                </Link>
                <Link to='/treneri'>
                    <span className='treneri'>Treneri</span>
                </Link>
                <Link to='/usluge'>
                    <span className='usluge'>Trenirajte sa nama</span>
                </Link>
                <Link to='/onama'>
                    <span className='onama'>O nama</span>
                </Link>
                <HashLink to='#kontakt'>
                    <span className='kontakt'>Kontakt</span>
                </HashLink>
                <Link to='/login'>
                    <span className='login'>Log in</span>
                </Link>
                <Link to='/signup'>
                    <span className='signup'>Sign up</span>
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
        <footer id="kontakt">
            <div className="footer">
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
        <div className='pozadina pocetnaSlika1'>
            {/* <img src = 'https://image.shutterstock.com/image-photo/dumbbells-boxing-gloves-sneakers-gift-260nw-1606209244.jpg'></img> */}
        </div>
        <div className='pozadina pocetnaSlika2'>
            {/* <img src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFm3LWasAbN2CuhcgoRTNQo29R9KCX-ArwlQ&usqp=CAU'></img> */}
        </div>
        <div className='pozadina pocetnaSlika3'>
            {/* <img src = 'https://i.pinimg.com/originals/c7/2a/e9/c72ae9e852372295fb344aa4c69dce87.jpg'></img> */}
        </div>
        <div className='pozadina pocetnaSlika4'>
            {/* <img src = 'https://image.shutterstock.com/image-photo/dumbbells-260nw-561980815.jpg'></img> */}
        </div>
    </div>)
}

export { Header, Footer, Pocetna }