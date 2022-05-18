import { useState, useContext } from "react";
import { UserContext } from '../context/UserContext';

const UserPocetna = () => {

    const {user} = useContext(UserContext);

    // console.log(user)

    return (
        <div className='profilKorisnika'>
            <div className="infoOProfilu">
                {/* <h3>{user.ime}</h3> */}
            </div>

        </div>
    )

}

export default UserPocetna