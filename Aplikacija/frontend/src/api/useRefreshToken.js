import axios from 'axios';
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { UpdateUser } from '../context/UserActions';

const useRefreshToken = () => {
    const { dispatch } = useContext(UserContext)

    const refresh = async () => {

        const response = await axios.get('http://localhost:8800/api/auth/refresh', {
            withCredentials: true
        });

        const updatedUser = (prev => {
            console.log(JSON.stringify(prev));
            console.log(response.data.token);
            return { ...prev, token: response.data.token }
        });

        dispatch(UpdateUser(updatedUser))

        return response.data.token;
    }
    return refresh;
};

export default useRefreshToken;
