import { Link } from "react-router-dom"

import styles from './DashBoard.module.css'

import { useState, useEffect } from 'react'
import useFlashMessage from '../../../hooks/userFlashMessages'

import api from '../../../utils/api'
import RoundedImage from '../../layouts/roundedImage'


function Mypets(){

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
            setPet(res.data.pets)
        })
    }, [token])

    return(
        <section>
            <div className={styles.petList_header}>
                <h1>MyPets</h1>
                <Link to='/pets/add'>CADASTRAR PET</Link>
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
                                <button>EXCLUIR</button>
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

                {pets.length == 0 && 
                <p>Não há pet cadastrado </p>
                }

            </div>
        </section>
    )
}

export default Mypets