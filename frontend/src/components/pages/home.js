import api from '../../utils/api'

import {useState, useEffect} from 'react'

import {Link} from 'react-router-dom'

import styles  from './home.module.css'

function Home (){
    const [pets, setPets] = useState([])

    useEffect(() => {

        api.get('/pets')
        .then((res) => {
            setPets(res.data.pets)
        })

    }, [])

    return(
        <section>
            <h1>HOME</h1>

            <div>
                {pets.length > 0 && 
                    pets.map((pet) => (
                        <div>
                            <p>imagem</p>
                            <h3>{pet.name}</h3>
                            <p>{pet.weight}kg</p>

                             {pet.available ? (
                                 <Link to={`pet/${pets._id}`}>Mais detalhes</Link>
                                ) : (
                                    <p>adotado</p>
                                )}
                        </div>
                    ))
                }

                {pets.length === 0 && (
                    <p>não há pets</p>
                )}
            </div>
        </section>
    )

}

export default Home