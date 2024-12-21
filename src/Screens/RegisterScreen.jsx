import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Forms from '../Componets/Forms'
import { FaWhatsapp } from 'react-icons/fa'
import { GiPadlock } from 'react-icons/gi'

const RegisterScreen = () => {
    const navigate = useNavigate()

    const actionRegister = async (formState) => {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
            method: 'POST',
            headers: {
                'content-Type': 'application/json'
            },
            body: JSON.stringify(formState)
        })
        const data = await response.json()
        if (data.ok) {
            navigate('/')
        }
        return data
    }

    const form_fields = [
        {
            label_text: 'Ingresa tu Nombre',
            field_component: 'INPUT',
            field_container_props: {
                className: 'row_field'
            },
            field_data_props: {
                name: 'name',
                id: 'name',
                placeholder: 'Cosme Fulanito',
                type: 'text'
            }
        },
        {
            label_text: 'Ingresa tu email',
            field_component: 'INPUT',
            field_container_props: {
                className: 'row_field'
            },
            field_data_props: {
                name: 'email',
                id: 'email',
                placeholder: 'cosmefulanito@gmail.com',
                type: 'email'
            }
        },
        {
            label_text: 'Ingresa nueva contraseña:',
            field_component: 'INPUT',
            field_container_props: {
                className: 'row_field'
            },
            field_data_props: {
                name: 'password',
                id: 'password',
                placeholder: 'password',
                type: 'password'
            }
        }
    ]
    const initial_state_form = {
        name: '',
        email: '',
        password: ''
    }


    return (
        <div className='container_login'>
            <div className='container_logo_login'>
                <FaWhatsapp className='icon_login' />
                <h2 className='logo_login'>Warap</h2>
            </div>
            <div className='card_form_login'>
                <h1 className='title_login'>Registrate</h1>
                <div className='form_login'>
                    <Forms action={actionRegister} form_fields={form_fields} initial_sate_form={initial_state_form}>
                        <div className='container_links'>
                            <button type='submit' className='button_login'>Register</button>
                            <Link className='links_login' to={'/'}>Iniciar session</Link>
                        </div>
                    </Forms>
                </div>
            </div>
                <p className='footer_login'><GiPadlock className='icon_footer' /> Tus mensajes personales estan cifrados de extremo a extremo </p>
        </div>
    )
}

export default RegisterScreen