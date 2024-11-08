import {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../../utils/api'

import style from './addPet.module.css'

import useFlashMessage from '../../../hooks/userFlashMessages'


function AddPets(){
    return(
        <section className={style.header}>
            <div>
                <h1>Cadastrar pet</h1>
                <p>Depois ele ficará disponível para adoção</p>
            </div>

            < p>formulário</p>
        </section>
    )
}

export default AddPets