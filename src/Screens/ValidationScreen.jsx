import React, { useEffect, useRef, useState } from 'react'
import { FaWhatsapp } from 'react-icons/fa6'
import { Link, useParams } from 'react-router-dom'

//Pantalla de validacion
const ValidationScreen = () => {
    const { user_email } = useParams() //Obtiene el email del usuario por parametros
    const [countdown, setCountdown] = useState(60) //Estado para manejar el temporizador
    const [mostrarButton, setMostrarButton] = useState(false) //Estado para mostrar el boton de reenviar
    const intervaloRef = useRef() //Referencia para almacenar el intervalo del temporizador

    //Inicia la cuenta regresiva
    const starCountdown = () => {
        clearInterval(intervaloRef.current) //Limpia cualquier intervalo previo
        intervaloRef.current = setInterval(() => {
            setCountdown((prevCountdown) => {
                if (prevCountdown > 0) {
                    return prevCountdown - 1 //Reduce el temporizador
                } else {
                    clearInterval(intervaloRef.current) //Limpia el intervalo cuando llega a 0
                    setMostrarButton(true) //Muestra el boton para reenviar el email
                    return 0
                }
            })
        }, 1000)
    }

    //Reinicia el temporizador
    const resetCountdown = () => {
        setCountdown(60) //Reinicia el temporizador a 60 segundos
        setMostrarButton(false) //Oculta el boton
        starCountdown() //Reinicia el intervalo
    }

    //Usa el efecto para iniciar el temporizador cuando se carga el componente
    useEffect(() => {
        starCountdown()
        return () => clearInterval(intervaloRef.current) //Limpia el intervalo al desmontar el componente
    }, [])

    //Formatea el tiempo en MM:SS
    const formatoTiempo = (segundos) => {
        const minutos = Math.floor(segundos / 60)
        const remaingSeconds = segundos % 60
        return `${minutos}:${remaingSeconds < 10 ? '0' : ''}${remaingSeconds}`
    }

    //Enviamos la consulta a la API para que reenvie el email
    const handleValidation = async () => {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/revalidation/${user_email}`, {
            method: 'POST'
        })
        const data = await response.json()
        return data
    }

    //Maneja la funcion de validacion y reinicia el temporizador
    const handleFunction = () => {
        handleValidation()
        resetCountdown()
    }

    return (
        <div className='container_login'>
            <div className='container_logo_login'>
                <FaWhatsapp className='icon_login' />
                <h2 className='logo_login'>Warap</h2>
            </div>
            <div className='card_form_login'>
                <h2 className='title_login'>Verifica tu identidad</h2>
                <p className='subtitle_login'>Se envio un correo de verificacion a tu direccion de email</p>
                <div className='form_login'>
                    <p className='subtitle_login'>Si no aparece en tu bandeja de entrada puede chequear en el span y sino volver a intentar en: {formatoTiempo(countdown)}</p>
                    <div className='container_links'>
                        {mostrarButton && <button  className='button_login' onClick={handleFunction}>Reenviar email</button>}
                        <Link className='links_login' to={'/'}>Ingresar</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ValidationScreen