import React, { useEffect, useState } from 'react'
import { getAuthenticatedHeaders } from '../Utils/feching'

const GetContacts = () => {
    const [contactos, setContactos] = useState([])
    const [loading_contactos, setLoadingContactos] = useState(true)
    const [error_contactos, setErrorContatos] = useState(null)


    const obtenerContactos = async () => {
        const response = await fetch('http://localhost:3000/api/contacts/', {
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
    useEffect(()=>{
        obtenerContactos()
    },[])

    return {
        contactos,
        loading_contactos,
        error_contactos
    }
}

export default GetContacts