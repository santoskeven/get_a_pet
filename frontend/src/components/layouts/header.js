import { Link } from "react-router-dom"

//styles
import styles from "./header.module.css"

import Logo from '../../assets/img/logo.webp'

function Header (){

    return(
        <nav className={styles.nav_bar}>

            <div className={styles.content_logo}>
                <img src={Logo} alt="Get A Pet"/>
                <h2>Get A Pet</h2>
            </div>

            <ul>
               <li>
                    <Link to="/">Home</Link>
               </li>
               <li>
                    <Link to="/Login">Login</Link>
               </li>
               <li>
                    <Link to="/Register">Register</Link>
               </li>
            </ul>

        </nav>
    )

}

export default Header