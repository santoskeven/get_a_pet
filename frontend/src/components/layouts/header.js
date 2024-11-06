import { Link } from "react-router-dom"
import { useContext } from "react"

//styles
import styles from "./header.module.css"

import Logo from '../../assets/img/logo.webp'

//componentes
import { Context } from "../../context/Context"

function Header (){

    const {authenticated, Logout} = useContext(Context)

    return(
        <nav className={styles.nav_bar}>

            <div className={styles.content_logo}>
                <img src={Logo} alt="Get A Pet"/>
                <h2>Get A Pet</h2>
            </div>

            <ul>
               {authenticated ? (
                 <>
                    <li>
                        <Link to="/">ADOTAR</Link>
                    </li>

                    <li>
                        <Link to="/user/profile">PERFIL</Link>
                    </li>

                    <li onClick={Logout}>SAIR</li>
                </>
                ) : (
                <>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    
                    <li>
                        <Link to="/login">Login</Link>
                    </li>

                    <li>
                        <Link to="/register">Registrar</Link>
                    </li>
                </>
                )}
                            
              
              
            </ul>

        </nav>
    )

}

export default Header