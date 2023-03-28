import React from "react";

//it is an object that contains a component
const AuthContext = React.createContext({
    userData: null,
    token: '',
    isLoggedIn: false,
})

export default AuthContext;