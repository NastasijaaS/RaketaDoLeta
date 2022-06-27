import axios from "axios";
import { useContext, useEffect } from 'react'
import { UserContext } from '../context/UserContext'
import useRefreshToken from "./useRefreshToken";
import { useCookies } from "react-cookie";

const useAxiosPrivate = () => {

  const { user } = useContext(UserContext)
  const [cookie, setCookie] = useCookies(['user'])
  // console.log(user)
  const refresh = useRefreshToken(user?.refreshToken)

  useEffect(() => {
    const refToken = user?.refreshToken

    const requestIntercept = axios.interceptors.request.use(function (config) {
      // Do something before request is sent
      //pitam da li u heder ima token ako nema dodam ga

      if (!config.headers['Authorization']) {
        config.headers['Authorization'] = 'Bearer ' + localStorage.getItem("token");
        config.headers['withCredentials'] = true
      }

      return config;
    }, function (error) {
      // Do something with request error
      return Promise.reject(error);
    });

    // Add a response interceptor
    const responseIntercept = axios.interceptors.response.use(function (response) {
      // Do something with response data
      return response;
    }, async function (error) {
      // Do something with response error
      //ako je istekao token zovem da mi vrati novi
      //dodam novi token i vratim zxios
      console.log(error + '  ' + user)
      const prevRequest = error?.config;  // ovde nadjem gresku iz prethodnog
      if (error?.response?.status === 403 && !prevRequest?.sent) {
        console.log(error?.response)
        prevRequest.sent = true;


        const newAccessToken = await refresh(cookie['ref-token']);


        prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

        //  console.log('use axios')
        // console.log(prevRequest)

        return axios(prevRequest);
      }

      return Promise.reject(error);
    });

    return () => {
      axios.interceptors.request.eject(requestIntercept);
      axios.interceptors.response.eject(responseIntercept);
    }
  }, [])

  return axios;
}

export default useAxiosPrivate;