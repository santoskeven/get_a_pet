// import {useState, useContext} from 'react'
// import {Context} from '../../../context/Context'
import { Link } from 'react-router-dom'

import Input from '../../form/input'
import styles from '../../form/form.module.css'



function Login (){

    function handleChange(e){}

    return(
        <section className={styles.form_container}>
           <form>
                <Input
                    text='Email'
                    type='text'
                    name= 'name'
                    placeholder='Digite seu email'
                    handleOnChange={handleChange}

                />

                <Input
                    text='Senha'
                    type='password'
                    name= 'password'
                    placeholder='Digite sua senha'
                    handleOnChange={handleChange}

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