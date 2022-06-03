import { createContext, useEffect, useReducer } from "react";
import UserReducer from "./UserReducer";

const defaultValue = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    ucitavaSe: false,
    error: null,
    // setUser: (user) => { }
};

const UserContext = createContext(defaultValue);

const UserContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(UserReducer, defaultValue);

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(state.user))
    }, [state.user])

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