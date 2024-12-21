import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Forms from '../Componets/Forms'
import { FaWhatsapp } from 'react-icons/fa'
import { GiPadlock } from 'react-icons/gi'

const ForgotPasswordScreen = () => {
    const actionForgot = async (formState) => {
        const respose = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/forgot-password`, {
            method: 'POST',
            headers: {
                'content-Type': 'application/json'
            },
            body: JSON.stringify(formState)
        })
        const data = await respose.json()
        return data
    }

    const form_fields = [
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
        }
    ]

    const initial_state_form = {
        email: '',
    }

    return (
        <div className='container_login'>
            <div className='container_logo_login'>
                <FaWhatsapp className='icon_login' />
                <h2 className='logo_login'>Warap</h2>
            </div>
            <div className='card_form_login'>
                <h1 className='title_login'>Recuperar contraseña</h1>
                <p>Al restablecer tu contraseña se enviara un correo electronico para enviarte las instrucciones de restablecimiento de contraseña</p>
                <div className='form_login'>
                    <Forms action={actionForgot} form_fields={form_fields} initial_sate_form={initial_state_form}>
                        <div className='container_links'>
                            <button className='button_login' type='submit'>Enviar</button>
                            <Link className='links_login' to={'/'}>Volver</Link>
                        </div>
                    </Forms>
                </div>
            </div>
            <p className='footer_login'><GiPadlock className='icon_footer' /> Tus mensajes personales estan cifrados de extremo a extremo </p>
        </div>
    )
}

export default ForgotPasswordScreen