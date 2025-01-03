import React from 'react'
import { useForm, usePerfil } from '../Hooks'
import { getAuthenticatedHeaders } from '../Utils/feching'
import './updateProfile.css'
import { useNavigate } from 'react-router-dom'

//Componente para actualizar el perfil del ususario
const UpdateMyProfileScreen = () => {
    const { perfil } = usePerfil() //Obtiene los datos del perfil actual
    const nav = useNavigate()

    //Manejo de estado y validaciones del formulario
    const { formState, handleChange, handleChangeImage, errors, setErrors, validationForm } = useForm({
        name: '',
        estado: '',
        image_base64: ''
    })

    //Maneja el envio del formulario para actualizar el perfil
    const handleUpdateProfile = async (evento) => {
        evento.preventDefault()

        //Validaciones del formulario
        const validationsErrors = validationForm(['name', 'estado', 'image_base64'])
        if (Object.keys(validationsErrors).length > 0) {
            return setErrors(validationsErrors) //Establece los errores
        }

        //Consulta PUT para actualizar el perfil
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/perfil/update`, {
            method: 'PUT',
            body: JSON.stringify(formState),
            headers: getAuthenticatedHeaders()
        })

        const data = await response.json()
        //Si la respuesta no es exitosa, setea el error
        if (!data.ok) {
            setErrors({ general: data.message })
        }
        nav('/home')
    }


    return (
        <div className='conteiner_update_perfil'>
            <h2 className='title_update_profile'>Editar perfil</h2>

            {/* Formulario para actualizar el perfil */}
            <form onSubmit={handleUpdateProfile}
                className='form_update_perfil'
            >
                <div className='update_container_input'>
                    <label htmlFor="name" className='label_input'>Name</label>
                    <input
                        className='input_update'
                        type="text"
                        name='name'
                        id='name'
                        placeholder={perfil.name}
                        onChange={handleChange}
                    />
                    {errors?.name && <span className='error_update'>{errors.name}</span>}
                    {errors?.general && <span className='error_update'>{errors.general}</span>}
                </div>
                <div className='update_container_input'>
                    <label htmlFor="estado" className='label_input'>Estado</label>
                    <input
                        className='input_update'
                        type="text"
                        name='estado'
                        id='estado'
                        placeholder={perfil.estado}
                        onChange={handleChange}
                    />
                    {errors?.estado && <span className='error_update'>{errors.estado}</span>}
                </div>
                <div className='update_container_input_img'>
                    <label htmlFor="image" className='label_input_img'>Seleccionar Imagen</label>
                    <input
                        className='input_update_img'
                        type="file"
                        name='image_base64'
                        id='image'
                        onChange={(evento) => handleChangeImage(evento, 'image_base64')}
                    />
                    {
                        formState.image_base64
                            ? <img src={formState.image_base64} alt="avatar" className='img_update_profile' />
                            : <img src={perfil.img || '/Assets/Avatar.png'} alt="avatar" className='img_update_profile' />
                    }
                </div>
                <button type='submit' className='btn_update_profile'>Guardar</button>
            </form>
        </div>
    )
}

export default UpdateMyProfileScreen