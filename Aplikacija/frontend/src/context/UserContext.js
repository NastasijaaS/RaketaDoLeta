import { createContext, useEffect, useReducer } from "react";
import UserReducer from "./UserReducer";

const defaultValue = {
    user: null,
    ucitavaSe: false,
    greska: false,
    // setUser: (user) => { }
};

const UserContext = createContext(defaultValue);

const UserContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(UserReducer, defaultValue);

    // useEffect(() => {

    //     localStorage.setItem("user", state.user)

    // }, [state.user])

    //  UserContext.user = state.user;

    // const addItemToCartHandler = (item) => {
    //     dispatch({ tip: 'LOGIN_SUCCESS', payload: item });
    // };


    return (
        <UserContext.Provider
            value={{
                user: state.user,
                ucitavaSe: state.ucitavaSe,
                greska: state.greska,
                dispatch,
            }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContextProvider, UserContext }