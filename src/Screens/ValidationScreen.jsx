import React, { useEffect, useRef, useState } from 'react'
import { FaWhatsapp } from 'react-icons/fa6'
import { Link, useParams } from 'react-router-dom'

const ValidationScreen = () => {
    const { user_email } = useParams()
    const [countdown, setCountdown] = useState(60)
    const [mostrarButton, setMostrarButton] = useState(false)
    const intervaloRef = useRef()


    const starCountdown = () => {
        clearInterval(intervaloRef.current)
        intervaloRef.current = setInterval(() => {
            setCountdown((prevCountdown) => {
                if (prevCountdown > 0) {
                    return prevCountdown - 1
                } else {
                    clearInterval(intervaloRef.current)
                    setMostrarButton(true)
                    return 0
                }
            })
        }, 1000)
    }

    const resetCountdown = () => {
        setCountdown(60)
        setMostrarButton(false)
        starCountdown()
    }

    useEffect(() => {
        starCountdown()
        return () => clearInterval(intervaloRef.current)
    }, [])

    const formatoTiempo = (segundos) => {
        const minutos = Math.floor(segundos / 60)
        const remaingSeconds = segundos % 60
        return `${minutos}:${remaingSeconds < 10 ? '0' : ''}${remaingSeconds}`
    }

    const handleValidation = async () => {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/revalidation/${user_email}`, {
            method: 'POST'
        })
        const data = await response.json()
        return data
    }

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