import {useState, useContext} from 'react'
import {Context} from '../../../context/Context'
import { Link } from 'react-router-dom'

import Input from '../../form/input'
import styles from '../../form/form.module.css'



function Login (){

    const [ user, setUser ] = useState({})
    const { Login } = useContext(Context)

    function handleChange(e){
        setUser({ ...user, [e.target.name]: e.target.value})
    }

    function handleSubmit(e){
        e.preventDefault()
        Login(user)
    }

    return(
        <section className={styles.form_container}>
            <h1>Login</h1>
           <form onSubmit={handleSubmit}>
                <Input
                    text ='Email'
                    type ='email'
                    name = 'email'
                    placeholder='Digite seu email'
                    handleOnChange = {handleChange}

                />

                <Input
                    text ='Senha'
                    type ='password'
                    name = 'password'
                    placeholder ='Digite sua senha'
                    handleOnChange = {handleChange}

                />

                <input type='submit' value='FAZER LOGIN'/>
           </form>
           
           <p>
                Ainda não tem login? <Link to='/register'>Clique aqui</Link>
           </p>
        </section>
    )

}

export default Login