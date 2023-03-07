import { createContext, useReducer, useEffect  } from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
    currentUser: null
};
export const AuthContext = createContext(INITIAL_STATE)

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
    
    useEffect(()=>{
        localStorage.setItem("user",state.currentUser)
    }, state.currentUser)

    return (
        <AuthContext.Provider value={{ current: state.currentUser, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}