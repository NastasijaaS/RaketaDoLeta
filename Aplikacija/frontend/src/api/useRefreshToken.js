import axios from 'axios';
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { UpdateUser, Odjavi } from '../context/UserActions';

const useRefreshToken = (props) => {
    

    const { user, dispatch } = useContext(UserContext)
    const refresh = async () => {
        // console.log('user ref token ' + user.refreshToken)

     //   console.log('saljem ' + props)
        // alert('uso')

        // console.log( 'refreshToken:'+ props)

        try{

        
            const response = await axios.post('http://localhost:8800/api/auth/refresh', {
                refreshToken: props
            });
// console.log(response)
            // const updatedUser = (prev => {
            //     console.log(JSON.stringify(prev));
            //     console.log(response.data);
            //     return { ...user, token: response.data.accessToken, refreshToken: response.data.refreshToken }
            // });

            const updatedUser = { ...user, token: response.data.accessToken, refreshToken: response.data.refreshToken }

            // // console.log(user.token)
            // console.log('novi acc token ' + response.data.accessToken)

            // console.log('novi ref token ' + response.data.refreshToken)

            dispatch(UpdateUser(updatedUser))

            // console.log(updatedUser.refreshToken)
            // alert('cekaj')

            return response.data.accessToken;
        }
        catch(err){
            alert('Doslo je do greske')
            console.log(err)
            dispatch(Odjavi())
        }
       
    }
    return refresh;
};

export default useRefreshToken;
