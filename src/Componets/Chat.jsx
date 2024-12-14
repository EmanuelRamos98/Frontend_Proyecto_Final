import React from 'react'
import { useMessages } from '../Hooks'
import { Link } from 'react-router-dom'

const Chat = ({ receiverId }) => {
    const { mensajes, loading_mensajes, error_mensajes } = useMessages(receiverId)
    return (
        <div>
            <h3>ver perfil</h3>
            <Link to={`/contact-profile/${receiverId}`}>+</Link>
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
                                                <Mensaje mensaje={mensaje} key={mensaje._id} />
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

const Mensaje = ({ mensaje }) => {
    return (
        <div key={mensaje._id}>
            <p>{mensaje.content}</p>
        </div>
    )
}

export default Chat