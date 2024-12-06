import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from '../Hooks'

const ForgotPasswordScreen = () => {
    const navigate = useNavigate()
    const { formState, handleChange } = useForm({
        email: ''
    })

    const handleForgot = async (evento) => {
        evento.preventDefault()
        const respose = await fetch('http://localhost:3030/api/auth/forgot-password', {
            method: 'POST',
            headers: {
                'content-Type': 'application/json'
            },
            body: JSON.stringify(formState)
        })
        const data = await respose.json()
        console.log(data);
        
    }
    return (
        <div>
            <h1>Recuperar contraseña</h1>
            <p>Al restablecer tu contraseña se enviara un correo electronico para enviarte las instrucciones de restablecimiento de contraseña</p>
            <form onSubmit={handleForgot}>
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
                <button type='submit'>Enviar</button>
            </form>
        </div>
    )
}

export default ForgotPasswordScreen