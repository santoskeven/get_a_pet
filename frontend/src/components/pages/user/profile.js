import {useState, useEffect} from 'react'

import style from './profile.module.css'
import FormStyle from '../../form/form.module.css'

import api from '../../../utils/api'
import Input from '../../form/input'

import userFlashMessage from '../../../hooks/userFlashMessages'
import RoundedImage from '../../layouts/roundedImage'

function Profile (){

    const [user, setUser] = useState({})
    const [ token ] = useState(localStorage.getItem('token' || ''))
    const [preview, setPreview] = useState()
    const { setFlashMessage } = userFlashMessage()

    useEffect(() => {
       api.get('/user/checkUser' ,{
        headers: {
            authorization: `Bearer ${JSON.parse(token)}`
        }
       }).then((res) => {
          setUser(res.data)
       })
    }, [token])

    function onFileChange(e){
        setPreview(e.target.files[0])
        setUser({...user, [e.target.name]: e.target.files[0]})
    }

    async function handleSubmit(e){

        let msgType = 'sucess'

        e.preventDefault()

        const formData = new FormData()

        await Object.keys(user).forEach((key) => {
            formData.append(key, user[key])
        })

        const data = await api.patch(`/user/edit/${user._id}`, formData, {
            headers: {
                authorization: `Bearer ${JSON.parse(token)}`,
                'Content-Type': 'multipart/form-data'
            }
        }).then((res) => {
            console.log(res.data)
            return res.data
        }).catch((err) => {
            msgType = 'error'
            return err.response.data
        })

        setFlashMessage(data.message, msgType)

    }

    function handleChange(e){
        setUser({...user, [e.target.name]: e.target.value})
    }

    return(
        <section>
           <div  className={style.form_header}>
                <h1>Profile</h1>
             {(user.image || preview) && (
                <RoundedImage 
                src={preview ? URL.createObjectURL(preview) : `${process.env.REACT_APP_API}/image/user/${user.image}`} 
                alt={user.name}
                />
             )}
           </div>

           <form className={FormStyle.form_container} onSubmit={handleSubmit}>

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
                    handleOnChange={handleChange}
                    value={user.name || ''}
                />

                <Input 
                    text='Telefone'
                    name='phone'
                    type='text'
                    placeholder= 'Insira seu telefone'
                    handleOnChange={handleChange}
                    value={user.phone || ''}
                />

                <Input 
                    text='Senha'
                    name='password'
                    type='password'
                    placeholder= 'Insira sua senha'
                    handleOnChange={handleChange}
                />

                <Input 
                    text='Confirmação de senha'
                    name='confirmpassword'
                    type='password'
                    placeholder= 'Insira sua senha novamente'
                    handleOnChange={handleChange}
                />

                <input type='submit' value='EDITAR'/>

           </form>
            
        </section>
    )

}

export default Profile