import React, { createContext, useState } from 'react'
import { useContext } from 'react'

const ChatContext = createContext()

export const useChat = () => useContext(ChatContext)

export const ChatProvider = ({ children }) => {
    const [selectedContacId, setSelectedContacId] = useState(null)

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
