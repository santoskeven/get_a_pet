import {useState} from 'react'

import styles from './form.module.css'

import Input from '../form/input'
import Select from '../form/select'

function PetForm({handleSubmit, petData, btnText}){
    
    const [pet, setPet] = useState(petData || {})
    const [preview, setPreview] = useState([])
    const colors = ['Branco', 'Preto', 'Cinza', 'Caramelo']
 
    function handleChange(e){
       setPet({ ...pet, [e.target.name]: e.target.value})
    }

    function onFileChange(e){
        setPreview(Array.from(e.target.files))
        setPet({ ...pet, images: [...e.target.files]})
    }

    function handleColor(e){
        setPet({ ...pet, color: e.target.options[e.target.selectedIndex].text})
    }

    function Submit(e){
        e.preventDefault()
        handleSubmit(pet)
    }

    return (
        <section className={styles.form_container}>
        <form onSubmit={Submit}>
            <div className={styles.preview_pets_images}>
                {preview.length > 0
                    ? preview.map((image, index) => (
                        <img 
                            src={URL.createObjectURL(image)} 
                            alt={pet.name} 
                            key={`${pet.name} + ${index}`} 
                        />
                    )) 
                    : pet.images && pet.images.map((image, index) => (
                        <img 
                            src={`${process.env.REACT_APP_API}/image/pets/${image}`} 
                            alt={pet.name} 
                            key={`${pet.name} + ${index}`} 
                        />
                    ))
                }
            </div>

            <Input
                key="images"
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