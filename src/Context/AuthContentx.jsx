import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [is_authenticated_state, setIsAuthenticatedState] = useState(false)

    useEffect(() => {
        const token = sessionStorage.getItem('access-token');
        setIsAuthenticatedState(Boolean(token))
    }, [])

    const login = (token) => {
        sessionStorage.setItem('access-token', token)
        setIsAuthenticatedState(true)
    }

    const logout = () => {
        sessionStorage.removeItem('access-token')
        setIsAuthenticatedState(false)
    }

    return (
        <AuthContext.Provider
            value={
                {
                    is_authenticated_state,
                    login,
                    logout
                }
            }
        >
            {children}
        </AuthContext.Provider>
    )
}