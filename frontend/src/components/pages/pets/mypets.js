import { Link } from "react-router-dom"

import styles from './DashBoard.module.css'

import { useState, useEffect } from 'react'
import useFlashMessage from '../../../hooks/userFlashMessages'

import api from '../../../utils/api'
import RoundedImage from '../../layouts/roundedImage'


function Mypets(){

    const [msgFail, setMsgFail] = useState()
    const [pets, setPet] = useState([])
    const [token] = useState(localStorage.getItem('token') || '') 
    const {setFlashMessage} = useFlashMessage()


    useEffect(() => {
        api.get('/pets/mypets', {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
            },
        })
        .then((res) => {
            const filterPet = res.data.pets || []
            setPet(filterPet)
        })
        .catch((err) => {
            return setMsgFail(err.response.data.message)
        })
    }, [token])

     async function removePets(id){

        let msgType = 'sucess'

        const data = await api.delete(`/pets/${id}`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        })
        .then((res) => {
            const updatedPets = pets.filter((pet) => pet._id !== id)
            setPet(updatedPets)
            return res.data
        })
        .catch((err) => {
            msgType = 'error'
            return err.response.data
        })

        setFlashMessage(data.message, msgType)

     }

    return(
        <section>
            <div className={styles.petList_header}>
                <h1>MyPets</h1>
                <Link to='/pet/add'>CADASTRAR PET</Link>
            </div>

            <div className={styles.petList_container}>  

                {pets.length > 0 && 
                    pets.map((pet) => (
                    <div className={styles.petList_row} key={pet._id}>
                        <RoundedImage 
                            src={`${process.env.REACT_APP_API}/image/pets/${pet.images[0]}`}
                            alt={pet.name}
                            width='px75'
                        />

                        <span className="bold">{pet.name}</span>
                        <div className={styles.actions}>
                            {pet.available ? (
                            (<>
                                {pet.adopter && <button className={styles.conclude_btn}> Concluir adoção</button>}
                                <Link to={`/pet/edit/${pet._id}`}>EDITAR</Link>
                                <button onClick={() => {
                                    removePets(pet._id)
                                }}>EXCLUIR</button>
                            </>)
                            ): 
                            (
                                <p>Pet já adotado</p>
                            )}
                        </div>
                    </div>
                    //    <p>Meus pets cadastrados</p>
                    ))
                }

                {pets.length === 0 && 
                <p>{msgFail}</p>
                }

            </div>
        </section>
    )

}

export default Mypets