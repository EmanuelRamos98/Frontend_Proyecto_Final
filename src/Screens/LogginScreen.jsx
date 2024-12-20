import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Forms from '../Componets/Forms'
import { AuthContext } from '../Context/AuthContentx'
import { FaWhatsapp } from "react-icons/fa"
import { GiPadlock } from "react-icons/gi"
import './logginScreen.css'

const LogginScreen = () => {
    const { login } = useContext(AuthContext)
    const nav = useNavigate()
    const actionLoggin = async (formState) => {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formState)
        })
        const data = await response.json()
        console.log(data);

        if (!data.ok) {
            console.log(data.message)
        }
        if (data.status === 403) {
            const user_email = data.payload.email
            nav(`/validation-email/${user_email}`)
        }
        login(data.payload.accesToken)
        nav('/home')

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
            label_text: 'Ingresa tu contraseña',
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
        <div className='container_login'>
            <div className='container_logo_login'>
                <FaWhatsapp className='icon_login' />
                <h2 className='logo_login'>Warap</h2>
            </div>
            <div className='card_form_login'>
                <h1 className='title_login'>Inicia sesion en Warap Web</h1>
                <h2 className='subtitle_login'>Envia mensajes privados a tus amigos y familiares a traves de Warap en tu navegador</h2>
                <div className='form_login'>
                    <Forms action={actionLoggin} form_fields={form_fields} initial_sate_form={initial_state_form}>
                        <div className='container_links'>
                            <button type='submit' className='button_login'>Ingresar</button>
                            <Link className='links_login' to={'/forgot-password'}>Olvide mi contraseña</Link>
                            <Link className='links_login' to={'/register'}>Registrarte</Link>
                        </div>
                    </Forms>
                </div>
            </div>
            <p className='footer_login'><GiPadlock className='icon_footer' /> Tus mensajes personales estan cifrados de extremo a extremo </p>
        </div>
    )
}

export default LogginScreen