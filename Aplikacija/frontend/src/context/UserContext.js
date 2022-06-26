import { createContext, useEffect, useReducer, useMemo } from "react";
import UserReducer from "./UserReducer";
import useAxiosPrivate from '../api/useAxiosPrivate'
import { LoginSuccess, LoginStart, LoginFailure } from "./UserActions";


const defaultValue = {
    // user: JSON.parse(localStorage.getItem("user")) || null,
    user: null,
    ucitavaSe: true,
    error: null,
};
const UserContext = createContext(defaultValue);

const UserContextProvider = ({ children }) => {

    const axiosPrivate = useAxiosPrivate()
    const [state, dispatch] = useReducer(UserReducer, defaultValue);


    useEffect(() => {
        let userId = localStorage.getItem("userId")
        let token = localStorage.getItem("token")
        console.log(token)
        //dispatch(LoginSuccess(cookies.user))

        const getUser = async () => {
            try {
                const res = await axiosPrivate.get('http://localhost:8800/api/auth/vratiKorisnikaPrekoTokena?userId=' + localStorage.getItem('userId'))
                console.log(res)
                if (res.data) {
                    dispatch(LoginSuccess(res.data))
                    localStorage.setItem('token', res.data?.token)
                }

            }
            catch (err) {
                console.log(err)
                localStorage.clear()
                dispatch(LoginFailure())
            }
        }

        if (token && token.length && userId) {
            dispatch(LoginStart())
            getUser()
        } else {
            dispatch(LoginFailure())
        }

    }, [])

    // console.log(state.user)
    // useEffect(() => {
    //     // let userId = ''

    //     // if (state.user?.korisnikId)
    //     //     userId = state.user.korisnikId
    //     // else if (state.user?.trennerId)
    //     //     userId = state.user.trennerId
    //     // else if (state.user?.upravaId)
    //     //     userId = state.user.upravaId

    //     // //   localStorage.setItem("user", JSON.stringify(state.user))

    //     // localStorage.setItem("userId", JSON.stringify(userId))
    //     // localStorage.setItem("token", JSON.stringify(state.user?.token))

    //     setCookie('user', state.user, { path: '/' });

    // }, [state.user])

    // const contextValue = useMemo(() => ({
    //     user: state.user,
    //     ucitavaSe: state.ucitavaSe,
    //     error: state.error,
    //     dispatch,
    // }), [state.user])

    return (
        <UserContext.Provider
            value=
            {{
                user: state.user,
                ucitavaSe: state.ucitavaSe,
                error: state.error,
                dispatch,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export { UserContextProvider, UserContext }