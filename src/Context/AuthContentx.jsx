import { createContext, useEffect, useState } from "react";

export const AuhtContext = createContext()

export const AuthProvider = ({ children }) => {
    const [is_authenticated_state, setIsAuthenticatedState] = useState(Boolean(sessionStorage.getItem('access-token')))

    useEffect(() => {
        const checkAuth = () => {
            const token = sessionStorage.getItem('access-token')
            setIsAuthenticatedState(Boolean(token))
        }
        checkAuth()
    }, [])

    return (
        <AuhtContext.Provider
            value={
                {
                    is_authenticated_state
                }
            }
        >
            {children}
        </AuhtContext.Provider>
    )
}