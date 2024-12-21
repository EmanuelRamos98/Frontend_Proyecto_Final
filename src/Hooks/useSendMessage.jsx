import React, { useState } from 'react'
import { getAuthenticatedHeaders } from '../Utils/feching'

const useSendMessage = () => {
    const [error_messgae, setErrorMessage] = useState(false)

    const enviarMensaje = async (receiverId, content) => {
        if (!receiverId) {
            return setErrorMessage('Falta el id del contacto')
        }
        if (!content) {
            return setErrorMessage('No se pueden enviar mensajes vacios')
        }
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/message/send`, {
            method: 'POST',
            headers: getAuthenticatedHeaders(),
            body: JSON.stringify({
                receiverId: receiverId,
                content: content
            })
        })
        const data = await response.json()
        if (!data.ok) {
            setErrorMessage(data.message);
        }
        return data
    }
    return {
        error_messgae,
        enviarMensaje
    }
}

export default useSendMessage