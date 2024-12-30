import { useEffect, useState } from "react"
import {  getAuthenticatedHeaders } from "../Utils/feching"

//Hook para el manejo de los usuarios
//Obtiene la lista completa de los usuarios registrados en la app
const useUsers = () => {
    const [user_state, setUserState] = useState([])
    const [user_Loading_state, setUserLoadingState] = useState(true)
    const [user_error_state, setUserErrorState] = useState(null)

    //Funcion para obtener la lista
    const obtenerUsers = async () => {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/contacts/search`, {
            method: 'GET',
            headers: getAuthenticatedHeaders()
        })
        const data = await response.json()
        //Si la respuesta no es exitosa seteanos el error
        if (!data.ok) {
            setUserErrorState(data.message)
            setUserLoadingState(false)
            return
        }
        //Si es exitosa, seteamos la lista para mostrarla luego
        setUserState(data.payload.users)
        setUserLoadingState(false)
    }
    useEffect(() => {
        obtenerUsers()
    }, [])

    return {
        user_state,
        user_Loading_state,
        user_error_state
    }
}

export default useUsers