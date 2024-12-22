import React, { useContext, useEffect, useRef, useState } from 'react'
import { getAuthenticatedHeaders } from '../Utils/feching'

const useMessages = (receiverId) => {
    const [mensajes, setMensajes] = useState([])
    const [loading_mensajes, setLoadingMensajes] = useState(true)
    const [error_mensajes, setErrorMensajes] = useState(null)

    const obtenerMensajes = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/message/conversation/${receiverId}`, {
                method: 'GET',
                headers: getAuthenticatedHeaders()
            })
            const data = await response.json()
            if (!data.ok) {
                setErrorMensajes(data.messages)
                setLoadingMensajes(false)
            } else {
                setMensajes(data.payload.conversation)
                setLoadingMensajes(false)
            }
        } catch {
            setErrorMensajes('Error al capturar los mensajes')
        } finally {
            setLoadingMensajes(false)
        }

    }

    useEffect(() => {
        
        if (!receiverId || typeof receiverId !== 'string' || receiverId.trim() === '') {
            return;
        }
        obtenerMensajes();

    }, [receiverId])


    return {
        mensajes,
        loading_mensajes,
        error_mensajes
    }
}

export default useMessages