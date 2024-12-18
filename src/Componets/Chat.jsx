import React from 'react'
import { useMessages } from '../Hooks'
import { Link } from 'react-router-dom'
import './chat.css'


const Chat = ({ receiverId }) => {
    const { mensajes, loading_mensajes, error_mensajes } = useMessages(receiverId)
    return (
        <div>
            <h3>ver perfil</h3>
            {
                loading_mensajes
                    ? <span>Cargando...</span>
                    : (
                        error_mensajes
                            ? <span>{error_mensajes}</span>
                            : <div>
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
    return (
        <div key={mensaje._id}
            className={`mensaje ${author ? 'contacto' : 'user'}`}>
            <p>{mensaje.content}</p>
        </div>
    )
}

export default Chat