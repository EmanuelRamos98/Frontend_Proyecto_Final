import React from 'react'
import { useForm } from '../Hooks'
import { Link, useNavigate } from 'react-router-dom'

const LogginScreen = () => {
    const navigate = useNavigate()
    const { formState, handleChange } = useForm({
        email: '',
        password: ''
    })



    const handleLoggin = async (evento) => {
        evento.preventDefault()
        const response = await fetch('http://localhost:3030/api/auth/login', {
            method: 'POST',
            headers: {
                'content-Type': 'application/json'
            },
            body: JSON.stringify(formState)
        })
        const data = await response.json()
        if (!data.ok) {
            //Manejaran los estados de error
        }
        else {
            //Nos guardamos el token de acceso en el session storage
            sessionStorage.setItem('access-token', data.payload.accesToken)
            navigate('/home')
        }
    }

    return (
        <div>
            <h1>Inicia sesion</h1>
            <form onSubmit={handleLoggin}>
                <div>
                    <label>Ingresa tu email:</label>
                    <input
                        name='email'
                        id='email'
                        placeholder='cosmefulanito@gmail.com'
                        type='email'
                        onChange={handleChange}
                        value={formState.email}
                    />
                </div>
                <div>
                    <label>Ingresa tu contraseña:</label>
                    <input
                        name='password'
                        id='password'
                        placeholder='Tu_contraseña'
                        type='password'
                        onChange={handleChange}
                        value={formState.password}
                    />
                </div>
                <Link to='/forgot-password'>Olvide mi contraseña</Link>
                <button type='submit'>Iniciar sesion</button>
                <Link to='/register'>Registrarse</Link>
            </form>
        </div>
    )
}

export default LogginScreen