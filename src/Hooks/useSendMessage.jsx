import React from 'react'
import { getAuthenticatedHeaders } from '../Utils/feching'

const useSendMessage = () => {

    const enviarMensaje = async (receiverId, content) => {
        const response = await fetch('http://localhost:3000/api/message/send', {
            method: 'POST',
            headers: getAuthenticatedHeaders(),
            body: JSON.stringify({
                receiverId: receiverId,
                content: content
            })
        })
        const data = await response.json()
        return data
        
    }
    return{
        enviarMensaje
    }
}

export default useSendMessage