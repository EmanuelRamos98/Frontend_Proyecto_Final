import React, { useState } from 'react'
import { getAuthenticatedHeaders } from '../Utils/feching'

//Hook para manejar el envio de mensajes
const useSendMessage = () => {
    //Estado para controlar los errores al enviar mensajes
    const [error_message, setErrorMessage] = useState(false)

    //Funcion para enviar mensaje
    const enviarMensaje = async (receiverId, content) => {
        //Validamos si falta algun dato
        if (!receiverId) {
            return setErrorMessage('Falta el id del contacto')
        }
        if (!content) {
            return setErrorMessage('No se pueden enviar mensajes vacios')
        }
        //Realizamo la llamada a la API
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
        error_message,
        enviarMensaje
    }
}

export default useSendMessage