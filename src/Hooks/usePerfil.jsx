import React, { useEffect, useState } from 'react'
import { getAuthenticatedHeaders } from '../Utils/feching.js'

const usePerfil = () => {
    const [perfil, setPerfil] = useState([])
    const [loading_perfil, setLoadingPerfil] = useState(true)
    const [error_perfil, setErrorPerfil] = useState(null)

    const obtenerPerfil = async () => {
        const response = await fetch('http://localhost:3000/api/perfil/', {
            method: 'GET',
            headers: getAuthenticatedHeaders()
        })
        const data = await response.json()
        if (!data.ok) {
            setErrorPerfil(data.message)
            setLoadingPerfil(false)
        } else {
            setPerfil(data.payload)
            setLoadingPerfil(false)
        }
    }

    useEffect(() => {
        obtenerPerfil()
    }, [])
    return {
        perfil,
        loading_perfil,
        error_perfil
    }
}

export default usePerfil