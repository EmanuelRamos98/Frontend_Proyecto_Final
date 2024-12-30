import React, { useEffect, useState } from 'react'
import { getAuthenticatedHeaders } from '../Utils/feching'

// Hook personalizado para obtener los contactos
const useContact = () => {
    const [contactos, setContactos] = useState([])
    const [loading_contactos, setLoadingContactos] = useState(true)
    const [error_contactos, setErrorContatos] = useState(null)

    //Funcion para obtener la lista de contacto desde la API
    const obtenerContactos = async () => {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/contacts/`, {
            method: 'GET',
            headers: getAuthenticatedHeaders()
        })
        const data = await response.json()        
        //Si la respuesta no es exitosa seteamos el error
        if (!data.ok) {
            setErrorContatos(data.message)
            setLoadingContactos(false)
            return
        }
        //Si la respuesta es exitosa, almacenamos los contactos
        setContactos(data.payload.contacts)
        setLoadingContactos(false)
    }
    useEffect(() => {
        obtenerContactos()
    }, [])

    return {
        contactos,
        loading_contactos,
        error_contactos
    }
}

export default useContact