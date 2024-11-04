import { useState } from 'react'

import style from './message.module.css'

function Message(){
    
    const [type, setType] = useState("")

    return(

        <div className={`${style.message} ${style[type]}`}>Minha mensagem</div>

    )

}

export default Message