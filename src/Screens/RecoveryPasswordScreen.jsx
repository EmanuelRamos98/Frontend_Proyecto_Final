import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Forms from '../Componets/Forms'
import { FaWhatsapp } from 'react-icons/fa'
import { GiPadlock } from 'react-icons/gi'

//Pantalla para cambiar la password
const RecoveryPasswordScreen = () => {
    const navigate = useNavigate() //Navegacion entre rutas
    const { reset_token } = useParams() //obtiene el token del params

    //Funcion para actualizar la password
    const actionRecoveryPassword = async (formState) => {
        //Realiza la consulta con una solicitud PUT a la API
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/recovery-password/${reset_token}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                password: formState.password
            })
        })
        const data = await response.json()

        //Si la respuesta es exitosa, redirige a la pag de inicio
        if (data.ok) {
            navigate('/')
        }
        return data
    }

    //Objeto field para crear el Formulario
    const form_fields = [
        {
            label_text: 'Ingresa nueva contraseña:',
            field_component: 'INPUT',
            field_container_props: {
                className: 'row_field'
            },
            field_data_props: {
                name: 'password',
                id: 'password',
                placeholder: '**********',
                type: 'password'
            }
        }
    ]

    //Estado inicial del formulario
    const initial_state_form = {
        password: ''
    }

    return (
        <div className='container_login'>
            <div className='container_logo_login'>
                <FaWhatsapp className='icon_login' />
                <h2 className='logo_login'>Warap</h2>
            </div>
            <div className='card_form_login'>
                <h1 className='title_login'>Ingrese su nueva contraseña</h1>
                <div className='form_login'>
                    {/* Componente Form */}
                    <Forms action={actionRecoveryPassword} form_fields={form_fields} initial_sate_form={initial_state_form}>
                        <div className='container_links'>
                            <button type='submit' className='button_login'>Enviar</button>
                            <Link className='links_login' to='/login'>Iniciar sesion</Link>
                        </div>
                    </Forms>
                </div>
            </div>
            <p className='footer_login'><GiPadlock className='icon_footer' /> Tus mensajes personales estan cifrados de extremo a extremo </p>
        </div>
    )
}

export default RecoveryPasswordScreen