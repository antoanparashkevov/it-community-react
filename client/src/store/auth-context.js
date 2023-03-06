import React from "react";

//this in the end will be an object with our default context and it will be a component
const AuthContext = React.createContext({
    isLoggedIn: false,
    isAdmin: false,
    userName: ''
})


export default AuthContext;