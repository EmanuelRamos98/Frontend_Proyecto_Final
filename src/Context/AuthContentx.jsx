import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext()
/* Contexto para protejer las rutas */
export const AuthProvider = ({ children }) => {
    const [is_authenticated_state, setIsAuthenticatedState] = useState(false)/* seteamos si esta logeado */
    const [is_authenticated_checked, setIsAuthenticatedCheked] = useState(false)/* para evitar errores en la carga */

    useEffect(() => {
        const token = sessionStorage.getItem('access-token');
        setIsAuthenticatedState(Boolean(token))
        setIsAuthenticatedCheked(true)
    }, [])
    
    /* Funcion para login */
    const login = (token) => {
        sessionStorage.setItem('access-token', token)
        setIsAuthenticatedState(true)
    }
    /* Funcion para el logout */
    const logout = () => {
        sessionStorage.removeItem('access-token')
        setIsAuthenticatedState(false)
    }

    return (
        <AuthContext.Provider
            value={
                {
                    is_authenticated_state,
                    is_authenticated_checked,
                    login,
                    logout
                }
            }
        >
            {children}
        </AuthContext.Provider>
    )
}