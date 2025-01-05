import React from 'react'
import { MdDelete } from "react-icons/md"
import { getAuthenticatedHeaders } from '../Utils/feching.js'

const DeleteConversation = ({ receiverId }) => {
    const handleDelete = async () => {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/message/delete-conversation/${receiverId}`, {
            method: 'DELETE',
            headers: getAuthenticatedHeaders()
        })
    }
    return (
        <>
            <button className='btn_borrar' onClick={handleDelete}><MdDelete /></button>
        </>

    )
}

export default DeleteConversation