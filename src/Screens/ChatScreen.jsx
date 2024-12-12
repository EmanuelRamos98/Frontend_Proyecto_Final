import React from 'react'
import { useParams } from 'react-router-dom'
import Chat from '../Componets/Chat'
import EnviarMessage from '../Componets/EnviarMessage'



const ChatScreen = () => {
    const { receiverId } = useParams()

    return (
        <div>
            <h1>Chat</h1>
            <Chat receiverId={receiverId} />
            <EnviarMessage receiverId={receiverId} />
        </div>
    )
}


export default ChatScreen