import { createContext, useEffect, useReducer } from "react";
import UserReducer from "./UserReducer";

const defaultValue = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    // user: null,
    ucitavaSe: false,
    error: null,
};

const UserContext = createContext(defaultValue);

const UserContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(UserReducer, defaultValue);

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(state.user))
        localStorage.setItem("korisnikId", JSON.stringify(state.user?.korisnikId))
        localStorage.setItem("token", JSON.stringify(state.user?.token))
    }, [state.user])

    useEffect(() => {
        let korisnikId = localStorage.getItem("korisnikId")
        let token = localStorage.getItem("token")

        if (token && token.length) {
            // get req na /me rutu
        }

    }, [])

    return (
        <UserContext.Provider
            value={{
                user: state.user,
                ucitavaSe: state.ucitavaSe,
                error: state.error,
                dispatch,
            }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContextProvider, UserContext }