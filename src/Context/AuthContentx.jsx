import { createContext, useEffect, useState } from "react";

export const AuhtContext = createContext()

export const AuthProvider = ({ children }) => {
    const access_token = Boolean(sessionStorage.getItem('access-token'))
    const [is_authenticated_state, setIsAuthenticatedState] = useState(access_token)

    useEffect(() => {
        Boolean(sessionStorage.getItem('access-token')) && setIsAuthenticatedState(true)
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