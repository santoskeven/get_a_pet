import style from './input.module.css'

function Input ({
    type, 
    text, 
    placeholder, 
    value, 
    name, 
    handleOnChange, 
    multiple 
}){

    return(
        <div className={style.form_control}>
            <label htmlFor={name}>{text}:</label>
            <input 
                type={type} 
                name={name} 
                id={name} 
                placeholder={placeholder} 
                onChange={handleOnChange} 
                value={value}
                {...(multiple ? {multiple } : "")}
            />
        </div>
    )

}

export default Input