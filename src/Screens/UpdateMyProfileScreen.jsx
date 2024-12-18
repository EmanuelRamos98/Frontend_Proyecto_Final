import React from 'react'
import { useForm } from '../Hooks'
import { getAuthenticatedHeaders } from '../Utils/feching'

const UpdateMyProfileScreen = () => {
    const { formState, handleChange, handleChangeImage } = useForm({
        name: '',
        estado: '',
        image_base64: ''
    })

    const handleUpdateProfile = async (evento) => {
        evento.preventDefault()
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/perfil/update`, {
            method:'PUT',
            body: JSON.stringify(formState),
            headers: getAuthenticatedHeaders()
        })
        const data = await response.json()
        console.log(data);
    }
    
    return (
        <div>
            <h1>Editar perfil</h1>
            <form onSubmit={handleUpdateProfile}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" name='name' id='name' placeholder='name' onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="estado">estado</label>
                    <input type="text" name='estado' id='estado' placeholder='estado' onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="image">imagen</label>
                    {formState.image_base64 && <img src={formState.image_base64} alt="avatar" width={100} />}
                    <input type="file" name='image_base64' id='image' onChange={(evento) => handleChangeImage(evento, 'image_base64')} />
                </div>
                <button type='submit'>Guardar</button>
            </form>
        </div>
    )
}

export default UpdateMyProfileScreen