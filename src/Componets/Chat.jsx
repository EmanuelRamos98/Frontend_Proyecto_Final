import React from 'react'
import { useMessages } from '../Hooks'
import { Link, useParams } from 'react-router-dom'
import './chat.css'


const Chat = ({ receiverId }) => {
    //Llama al hook para obtener los mensajes
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
                                    //Mapea sobre os mensajes y los renderiza mediante el componente Mensaje
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
    //Diferencio cual es el autor del mensaje
    const author = mensaje.authorId === receiverId
    //Obtengo la fecha de los mensajes
    const isoDate = mensaje.createdAt


    return (
        <div key={mensaje._id} className={`mensaje ${author ? 'contacto' : 'user'}`}>
            <div className='mensaje_container'>
                <p className='chat_text'>{mensaje.content}</p>
                {/* Muestra la fecha formateada */}
                <FormatDate isoDate={isoDate} />
            </div>
        </div>
    )
}


const FormatDate = ({ isoDate }) => {
    //Convierto la fecha ISO en un objeto Date
    const date = new Date(isoDate)

    //Conventimos a formato legible
    const day = date.toLocaleDateString('es-ES', { weekday: 'short' })
    const time = date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })

    return (
        <>
            <p>{day} {time}</p>
        </>

    )
}


export default Chat