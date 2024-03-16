import { createContext } from "react";

//it is an object that contains a component
const AuthContext = createContext({
    userData: null,
    token: '',
    isLoggedIn: false,
})

export default AuthContext;