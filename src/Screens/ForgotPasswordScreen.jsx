import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Forms from '../Componets/Forms'

const ForgotPasswordScreen = () => {
    const actionForgot = async (formState) => {
        const respose = await fetch('http://localhost:3000/api/auth/forgot-password', {
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
        <div>
            <h1>Recuperar contraseña</h1>
            <p>Al restablecer tu contraseña se enviara un correo electronico para enviarte las instrucciones de restablecimiento de contraseña</p>
            <Forms action={actionForgot} form_fields={form_fields} initial_sate_form={initial_state_form}>
                <button type='submit'>Enviar</button>
                <Link to={'/'}>Volver</Link>
            </Forms>
        </div>
    )
}

export default ForgotPasswordScreen