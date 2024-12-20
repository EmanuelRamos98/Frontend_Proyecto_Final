import React, { useEffect, useState } from 'react'
import { getAuthenticatedHeaders } from '../Utils/feching'

const useContact = () => {
    const [contactos, setContactos] = useState([])
    const [loading_contactos, setLoadingContactos] = useState(true)
    const [error_contactos, setErrorContatos] = useState(null)

    const obtenerContactos = async () => {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/contacts/`, {
            method: 'GET',
            headers: getAuthenticatedHeaders()
        })
        const data = await response.json()        
        if (!data.ok) {
            setErrorContatos(data.message)
            setLoadingContactos(false)
            return
        }
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