import { Children, createContext } from "react";

import useAuth from "../hooks/userAuth";

const Context = createContext()

function UserProvider({children}){

    const { Register } = useAuth()

    return <Context.Provider value={{ Register }}>{children}</Context.Provider>

}

export {Context, UserProvider}