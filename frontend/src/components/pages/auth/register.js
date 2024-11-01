import Input from '../../form/input'

import {Link} from "react-router-dom"
 
//css style form
import Form from '../../form/form.module.css'

function Register (){

    function handleChange(e){}

    return(
        <section className={Form.form_container}> 
            <h1>Register</h1>

            <form>
                <Input 
                    text = 'Nome'
                    type = 'text'
                    name = 'name'
                    placeholder= 'Digite seu nome'
                    handleOnChange={handleChange}
                />

                <Input 
                    text = 'Telefone'
                    type = 'text'
                    name = 'phone'
                    placeholder= 'Digite seu telefone'
                    handleOnChange={handleChange}
                />

                <Input 
                    text = 'Email'
                    type = 'email'
                    name = 'email'
                    placeholder= 'Digite seu email'
                    handleOnChange={handleChange}
                />

                <Input 
                    text = 'Senha'
                    type = 'password'
                    name = 'password'
                    placeholder= 'Digite sua senha '
                    handleOnChange={handleChange}
                />

                <Input 
                    text = 'confirme sua senha '
                    type = 'password'
                    name = 'confirmpassword'
                    placeholder= 'Digite sua senha novamente'
                    handleOnChange={handleChange}
                />
                 <input type="submit" value="Cadastrar"/>
            </form>

            <p>
                Já tem uma conta? <Link to="/login">Clique aqui</Link>
            </p>
        </section>
    )

}

export default Register