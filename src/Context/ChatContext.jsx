import React, { createContext, useEffect, useState } from 'react'
import { useContext } from 'react'

const ChatContext = createContext()

export const useChat = () => useContext(ChatContext)
/* Contexto para manejar el ID de contacto. 
De esta forma, al tenerlo configurado aqui, 
nos permite trabajar con el mismo ID y pasar 
de movil a desktop (y viceversa) sin problemas.
*/
export const ChatProvider = ({ children }) => {
    const [selectedContacId, setSelectedContacId] = useState(() => {
        return sessionStorage.getItem('selectedContacId')
    })

    useEffect(() => {
        if (selectedContacId) {
            sessionStorage.setItem('selectedContacId', selectedContacId)
        } else {
            sessionStorage.removeItem('selectedContacId')
        }
    }, [selectedContacId])

    return (
        <ChatContext.Provider value={
            {
                selectedContacId, setSelectedContacId
            }
        }>
            {children}
        </ChatContext.Provider>
    )
}
