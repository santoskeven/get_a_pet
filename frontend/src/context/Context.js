import {createContext } from "react";

import useAuth from "../hooks/userAuth";

const Context = createContext()

function UserProvider({children}){

    const {authenticated, Register, Logout, Login } = useAuth()

    return <Context.Provider value={{authenticated, Register, Logout,Login }}>{children}</Context.Provider>

}

export {Context, UserProvider} 