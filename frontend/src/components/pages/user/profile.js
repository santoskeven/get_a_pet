import {useState, useEffect} from 'react'

import style from './profile.module.css'
import FormStyle from '../../form/form.module.css'

import api from '../../../utils/api'
import Input from '../../form/input'

function Profile (){

    const [user, setUser] = useState({})
    const [token] = useState(localStorage.getItem('token' || ''))

    useEffect(() => {
       api.get('/user/checkUser' ,{
        headers: {
            authorization: `Bearer ${JSON.parse(token)}`
        }
       }).then((res) => {
          setUser(res.data)
       })
    }, [token])

    function onFileChange(e){}

    function handleChange(e){}

    return(
        <section>
           <div  className={style.form_header}>
                <h1>Profile</h1>
                <p>Preview da imagem</p>
           </div>

           <form className={FormStyle.form_container}>

                <Input 
                    text='Imagem'
                    name='image'
                    type='file'
                    placeholder= 'Insira uma imagem'
                    handleOnChange={onFileChange}
                />

                <Input 
                    text='Email'
                    name='email'
                    type='email'
                    placeholder= 'Insira seu email'
                    handleOnChange={handleChange}
                    value={user.email || ''}
                />

                <Input 
                    text='Nome'
                    name='name'
                    type='text'
                    placeholder= 'Insira seu nome'
                    handleOnChange={onFileChange}
                    value={user.name || ''}
                />

                <Input 
                    text='Telefone'
                    name='phone'
                    type='text'
                    placeholder= 'Insira seu telefone'
                    handleOnChange={onFileChange}
                    value={user.phone || ''}
                />

                <Input 
                    text='Senha'
                    name='password'
                    type='password'
                    placeholder= 'Insira sua senha'
                    handleOnChange={onFileChange}
                    value={user.password || ''}
                />

                <Input 
                    text='Confirmação de senha'
                    name='confirmpassword'
                    type='password'
                    placeholder= 'Insira sua senha novamente'
                    handleOnChange={onFileChange}
                />

                <input type='submit' value='EDITAR'/>

           </form>
            
        </section>
    )

}

export default Profile