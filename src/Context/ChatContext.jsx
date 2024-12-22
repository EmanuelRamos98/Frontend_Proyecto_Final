import React, { createContext, useEffect, useState } from 'react'
import { useContext } from 'react'

const ChatContext = createContext()

export const useChat = () => useContext(ChatContext)

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
