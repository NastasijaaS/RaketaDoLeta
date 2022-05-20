import { useState, useContext } from "react";
import { UserContext } from '../context/UserContext';
import '../styles/userPocetna.css'
import Korisnik from "./ProfilKorisnik";
import Uprava from './ProfilUprava'
import Trener from './ProfilTrener'

const UserPocetna = () => {

    const { user } = useContext(UserContext);

    console.log(user)

    return (
        <div className="profil">
            {/* <Korisnik/> */}
            {(user.tip == 'Korisnik' || !user.tip) && <Korisnik />}
            {user.tip == 'Trener' && <Trener />}
            {user.tip == 'Uprava' && <Uprava />}
        </div>
    )

}

export default UserPocetna