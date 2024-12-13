import { useEffect, useState } from "react"
import { authenticatedUser, getAuthenticatedHeaders } from "../Utils/feching"

const useUsers = () => {
    const [user_state, setUserState] = useState([])
    const [user_Loading_state, setUserLoadingState] = useState(true)
    const [user_error_state, setUserErrorState] = useState(null)

    const obtenerUsers = async () => {
        const response = await fetch('http://localhost:3000/api/contacts/search', {
            method: 'GET',
            headers: getAuthenticatedHeaders()
        })
        const data = await response.json()
        if (!data.ok) {
            setUserErrorState(data.message)
            setUserLoadingState(false)
            return
        }
        setUserState(data.payload.lista_users)
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