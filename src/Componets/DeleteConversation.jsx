import React from 'react'
import { MdDelete } from "react-icons/md"
import { getAuthenticatedHeaders } from '../Utils/feching.js'

const DeleteConversation = ({ receiverId }) => {
    const handleDelete = async () => {
        const response = await fetch(`http://localhost:3000/api/message/delete-conversation/${receiverId}`, {
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