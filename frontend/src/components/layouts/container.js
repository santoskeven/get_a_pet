//css style
import style from './container.module.css'

function Container({children}){

    return(

        <main className={style.container}>
            {children}
        </main>

    )

}

export default Container 