import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from '../Hooks'

const RegisterScreen = () => {
    const navigate = useNavigate()
    const { formState, handleChange } = useForm({
        name: '',
        email: '',
        password: ''
    })

    const handleRegister = async (evento) => {
        evento.preventDefault()
        const response = await fetch('http://localhost:3030/api/auth/register', {
            method: 'POST',
            headers: {
                'content-Type': 'application/json'
            },
            body: JSON.stringify(formState)
        })
        const data = await response.json()
        console.log(data)
        if (data.ok) {
            navigate('/')
        }
    }


    return (
        <div>
            <h2>Registrate</h2>
            <form onSubmit={handleRegister}>
                <div>
                    <label>Ingresa tu username:</label>
                    <input
                        name='name'
                        id='name'
                        placeholder='cosme fulanito'
                        type='text'
                        onChange={handleChange}
                        value={formState.name}
                    />
                </div>
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
                    <label>Ingresa tu password:</label>
                    <input
                        name='password'
                        id='password'
                        placeholder='**********'
                        type='password'
                        onChange={handleChange}
                        value={formState.password}
                    />
                </div>
                <button type='submit'>Registrarse</button>
            </form>
        </div>
    )
}

export default RegisterScreen