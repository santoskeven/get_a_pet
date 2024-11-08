import { Link } from "react-router-dom"

import { useState, useEffect } from 'react'

function Mypets(){

    const [pet, setPet] = useState([])

    return(
        <section>
            <div>
                <h1>MyPets</h1>
                <Link to='/pet/add'>CADASTRAR PET</Link>
            </div>

            {pet.length > 0 && 
            <p>Meus pets cadastrados</p>
            }

            {pet.length == 0 && 
            <p>Não há pet cadastrado </p>
            }

        </section>
    )
}

export default Mypets