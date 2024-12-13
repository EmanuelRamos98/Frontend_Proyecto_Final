import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Forms from '../Componets/Forms'
import { AuthContext } from '../Context/AuthContentx'


const LogginScreen = () => {
    const { login } = useContext(AuthContext)
    const nav = useNavigate()
    const actionLoggin = async (formState) => {
        const response = await fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formState)
        })
        const data = await response.json()
        console.log(data);
        
        if (!data.ok) {
            console.log('fallo login');
        } else {
            login(data.payload.accesToken)
            nav('/home')
        }
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
        email: '',
        password: ''
    }
    return (
        <div>
            <h1>Inicia sesion</h1>
            <Forms action={actionLoggin} form_fields={form_fields} initial_sate_form={initial_state_form}>
                <button type='submit'>Ingresar</button>
                <Link to={'/forgot-password'}>Olvide mi contraseña</Link>
                <Link to={'/register'}>Registrarte</Link>
            </Forms>
        </div>
    )
}

export default LogginScreen