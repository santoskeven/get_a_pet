import { Children, createContext } from "react";

import useAuth from "../hooks/userAuth";

const Context = createContext()

function UserProvider({children}){

    const {authenticated, Register } = useAuth()

    return <Context.Provider value={{authenticated, Register }}>{children}</Context.Provider>

}

export {Context, UserProvider} 