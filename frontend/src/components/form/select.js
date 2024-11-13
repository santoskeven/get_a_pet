import styles from './select.module.css'

function Select({name, text, options, handleOnChange, value}){
    return(
        <div className={styles.form_control}>
            <label htmlFor={name}>{text}:</label>
            <select name={name} id={name} onChange={handleOnChange} value={value || ''}>
                <option>Selecione uma opção</option>
               {options.map((option) => (
                    <option value={option} key={option}>
                        {option}
                    </option>
               ))}
            </select>
        </div>
    )
}

export default Select