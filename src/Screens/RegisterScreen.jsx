import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Forms from '../Componets/Forms'

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
                placeholder: '',
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
        <div>
            <h2>Registrate</h2>
            <Forms action={actionRegister} form_fields={form_fields} initial_sate_form={initial_state_form}>
                <button type='submit'>Register</button>
                <Link to={'/'}>Iniciar session</Link>
            </Forms>
        </div>
    )
}

export default RegisterScreen