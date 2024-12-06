import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from '../Hooks'

const RecoveryPasswordScreen = () => {
    const navigate = useNavigate()
    const { reset_token } = useParams()
    const { formState, handleChange } = useForm({
        password: ''
    })

    const handleRecoveryPassword = async (evento) => {
        evento.preventDefault()
        const response = await fetch(`http://localhost:3030/api/auth/recovery-password/${reset_token}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                password: formState.password,
                reset_token
            })
        })
        const data = await response.json()
        console.log(data);
        
        if (data.ok) {
            navigate('/')
        }
    }
    return (
        <div>
            <h1>Ingrese su nueva contraseña</h1>
            <form onSubmit={handleRecoveryPassword}>
                <div>
                    <label>Contraseña:</label>
                    <input
                        name='password'
                        id='password'
                        placeholder='*********'
                        type='password'
                        onChange={handleChange}
                        value={formState.password}
                    />
                </div>
                <button type='submit'>Enviar</button>
            </form>
        </div>
    )
}

export default RecoveryPasswordScreen