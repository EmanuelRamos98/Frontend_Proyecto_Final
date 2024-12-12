import React, { useEffect, useState } from 'react'
import { getAuthenticatedHeaders } from '../Utils/feching'


const useMessages = ( receiverId ) => {
    const [mensajes, setMensajes] = useState([])
    const [loading_mensajes, setLoadingMensajes] = useState(true)
    const [error_mensajes, setErrorMensajes] = useState(null)


    const obtenerMensajes = async () => {
        const response = await fetch(`http://localhost:3000/api/message/conversation/${receiverId}`, {
            method: 'GET',
            headers: getAuthenticatedHeaders()
        })
        const data = await response.json()
        if (!data.ok) {
            setErrorMensajes(data.messages)
            setLoadingMensajes(false)
        }else{
            setMensajes(data.payload.conversation)
            setLoadingMensajes(false)
        }
        
    }
    
    useEffect(() => {
        obtenerMensajes()
    }, [])
    return {
        mensajes,
        loading_mensajes,
        error_mensajes
    }
}

export default useMessages