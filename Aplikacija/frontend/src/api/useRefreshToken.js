import axios from 'axios';
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { UpdateUser, Odjavi } from '../context/UserActions';

const useRefreshToken = () => {

    const { user, dispatch } = useContext(UserContext)
    //  console.log(props)

    const refresh = async (token) => {

        try {
            const response = await axios.post('http://localhost:8800/api/auth/refresh', {
                refreshToken: token
            });

            const updatedUser = { ...user, token: response.data.accessToken, refreshToken: response.data.refreshToken }
            // dispatch(UpdateUser(updatedUser))
            localStorage.setItem('token', response.data.accessToken)
           // dispatch({ tip: "UPDATE_USER", payload: { ...user, ...updatedUser } })

            return response.data.accessToken;
        }
        catch (err) {
            // dispatch(Odjavi())
            localStorage.clear()
            alert('Doslo je do greske use refresh ')
            console.log(err)

            // window.location.reload()
        }

    }
    return refresh;
};

export default useRefreshToken;
