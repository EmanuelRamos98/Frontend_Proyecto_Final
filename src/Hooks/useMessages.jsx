import React, { useContext, useEffect, useRef, useState } from 'react'
import { getAuthenticatedHeaders } from '../Utils/feching'

//Hook para obtener los mensajes
const useMessages = (receiverId) => {
    const [mensajes, setMensajes] = useState([])//Estado para almacenar los mensajes
    const [loading_mensajes, setLoadingMensajes] = useState(true)
    const [error_mensajes, setErrorMensajes] = useState(null)

    //Funcion para obtener mensajes desde la api
    const obtenerMensajes = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/message/conversation/${receiverId}`, {
                method: 'GET',
                headers: getAuthenticatedHeaders()
            })
            const data = await response.json()
            //Si la respuesta no es exitosa, establecemos el error
            if (!data.ok) {
                setErrorMensajes(data.messages)
                setLoadingMensajes(false)
            } else {
                //Si la respuesta es exitosa, almacenamos los mensajes
                setMensajes(data.payload.conversation)
                setLoadingMensajes(false)
            }
        } catch {
            //Capturamos cualquier error en la llamada
            setErrorMensajes('Error al capturar los mensajes')
        } finally {
            setLoadingMensajes(false)
        }

    }

    
    useEffect(() => {
        //Validamos que 'receiverId' sea valido
        if (!receiverId || typeof receiverId !== 'string' || receiverId.trim() === '') {
            return;
        }
        obtenerMensajes()
    }, [receiverId])


    return {
        mensajes,
        loading_mensajes,
        error_mensajes
    }
}

export default useMessages