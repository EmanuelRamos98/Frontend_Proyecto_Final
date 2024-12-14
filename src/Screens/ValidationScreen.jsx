import React, { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const ValidationScreen = () => {
    const { user_email } = useParams()
    const [countdown, setCountdown] = useState(10)
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
        setCountdown(10)
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
        const response = await fetch(`http://localhost:3000/api/auth/revalidation/${user_email}`, {
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
        <div>
            <h1>Falta verificar tu identidad</h1>
            <p>Se envio un correo de verificacion a tu direccion de email</p>
            <div>
                <p>Si no aparece en tu bandeja de entrada puede chequear en el span y sino volver a intentar en: {formatoTiempo(countdown)}</p>
                {mostrarButton && <button onClick={handleFunction}>Reenviar email</button>}
                <Link to={'/'}>Ingresar</Link>
            </div>
        </div>
    )
}

export default ValidationScreen