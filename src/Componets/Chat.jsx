import React from 'react'
import { useMessages } from '../Hooks'
import { Link, useParams } from 'react-router-dom'
import './chat.css'


const Chat = ({ receiverId }) => {

    const { mensajes, loading_mensajes, error_mensajes } = useMessages(receiverId)
    return (
        <div>
            {
                loading_mensajes
                    ? <span>Cargando...</span>
                    : (
                        error_mensajes
                            ? <span>{error_mensajes}</span>
                            : <div className='container_mensaje'>
                                {
                                    mensajes.map(
                                        (mensaje) => {
                                            return (
                                                <Mensaje mensaje={mensaje} key={mensaje._id} receiverId={receiverId} />
                                            )
                                        }
                                    )
                                }
                            </div>
                    )
            }
        </div >
    )
}

const Mensaje = ({ mensaje, receiverId }) => {
    const author = mensaje.authorId === receiverId
    const isoDate = mensaje.createdAt


    return (
        <div key={mensaje._id} className={`mensaje ${author ? 'contacto' : 'user'}`}>
            <div className='mensaje_container'>
                <p className='chat_text'>{mensaje.content}</p>
                <FormatDate isoDate={isoDate} />
            </div>
        </div>
    )
}


const FormatDate = ({ isoDate }) => {
    const date = new Date(isoDate)

    const day = date.toLocaleDateString('es-ES', { weekday: 'short' })
    const time = date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })

    return (
        <>
            <p>{day} {time}</p>
        </>

    )
}


export default Chat