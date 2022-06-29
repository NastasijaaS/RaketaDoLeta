import axios from 'axios';
import { useCookies } from 'react-cookie';

const useRefreshToken = () => {
    
    const [cookie, setCookie] = useCookies(['ref-token'])

    const refresh = async (token) => {

        try {
            const response = await axios.post('http://localhost:8800/api/auth/refresh', {
                refreshToken: token
            });

            localStorage.setItem('token', response.data.accessToken)

            // setCookie('ref-token', response.data.refreshToken)
            return response.data.accessToken;
        }
        catch (err) {
            // dispatch(Odjavi())
            //localStorage.clear()
            alert('Doslo je do greske use refresh ')
            console.log(err)

            // window.location.reload()
        }

    }
    return refresh;
};

export default useRefreshToken;
