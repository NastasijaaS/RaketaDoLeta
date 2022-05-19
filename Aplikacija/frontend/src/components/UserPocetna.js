import { useState, useContext } from "react";
import { UserContext } from '../context/UserContext';
import '../styles/userPocetna.css'
import Korisnik from "./ProfilKorisnik";

const UserPocetna = () => {

    const { user } = useContext(UserContext);

    // console.log(user)

    return (
        <div className="profil">
            <Korisnik/>
            {/* {user.tipKorisnika === 'Korisnik' && <Korisnik />}
            {user.tipKorisnika === 'Trener' && <Trener />}
            {user.tipKorisnika === 'Uprava' && <Uprava />} */}
        </div>
    )

}

export default UserPocetna