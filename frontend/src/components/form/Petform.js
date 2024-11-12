import {useState} from 'react'

import styles from './form.module.css'

import Input from '../form/input'
import Select from '../form/select'

function PetForm({handleSubmit, petData, btnText}){
    
    const [pet, setPet] = useState(petData || {})
    const [preview, setPreview] = useState([])
    const colors = ['Branco', 'Preto', 'Cinza', 'Caramelo']
 
    function handleChange(e){
       setPet({...pet, [e.target.name]: e.target.value})
    }

    function onFileChange(e){
        setPet({...pet, [e.target.images]: [...e.target.files]})
    }

    function handleColor(e){
        setPet({...pet, colors: e.target.options[e.target.selectedIndex].index})
    }

    function Submit(e){
        e.preventDefault()
        console.log(pet)
        // handleSubmit(pet)
    }

    return (
        <section className={styles.form_container}>
        <form onSubmit={Submit}>
            <Input 
                text='Imagem'
                type='file'
                name='images'
                placeholder='Adicione as fotos do seu pet'
                handleOnChange={onFileChange}
                multiple={true}

            />
            <Input 
                text='Nome'
                type='text'
                name='name'
                placeholder='Digite o nome do pet'
                handleOnChange={handleChange}
                value = {pet.name || ''}
            />

            <Input 
                text='Idade'
                type='text'
                name='age'
                placeholder='Digite a idade do pet'
                handleOnChange={handleChange}
                value = {pet.age || ''}
            />

            <Input 
                text='Peso'
                type='text'
                name='weight'
                placeholder='Digite o peso do pet'
                handleOnChange={handleChange}
                value = {pet.weight || ''}
            />

            <Select 
                name='color'
                text='Selecione a cor'
                options={colors}
                handleOnChange={handleColor}
                value={pet.color || ''}
            />
            <input type='submit' value={btnText}/>

        </form>

        </section>
    )
}

export default PetForm