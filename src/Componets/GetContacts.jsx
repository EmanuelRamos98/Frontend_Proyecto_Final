import React, { useState } from 'react'
import { useContact } from '../Hooks'
import { Link } from 'react-router-dom'
import ChatScreen from '../Screens/ChatScreen'
import { useChat } from '../Context/ChatContext'
import './getContac.css'


const GetContacts = () => {
    const { selectedContacId, setSelectedContacId } = useChat()
    const { contactos, loading_contactos, error_contactos } = useContact()
    const [buscar, setBuscar] = useState('')
    const [mostrar_chat, setMostrarChat] = useState(false)
    const handleChange = (event) => {
        setBuscar(event.target.value)
    }

    const bucarContact = Array.isArray(contactos)
        ? contactos.filter(contacto =>
            contacto && contacto.name && contacto.name.toLowerCase().includes(buscar.toLowerCase())
        )
        : [];


    const handleCkick = () => {
        setMostrarChat(true)
    }

    const handleContact = (contacId) => {
        setSelectedContacId(contacId)
    }

    return (
        <div>
            <div className='container_input_bucar'>
                <input type="text"
                    placeholder='Buscar...'
                    value={buscar}
                    onChange={handleChange}
                    className='input_bucar'
                />
            </div>

            {
                loading_contactos
                    ? <span>Cargando..</span>
                    : (
                        error_contactos
                            ? <span>{error_contactos}</span>
                            : <div>
                                {
                                    bucarContact.map(
                                        (contacto) => {
                                            return (
                                                <Contacto contacto={contacto} key={contacto.id} handleContact={handleContact} />
                                            )
                                        }
                                    )
                                }
                            </div>
                    )
            }
        </div>
    )
}


const Contacto = ({ contacto, handleContact }) => {
    return (
        <div key={contacto.id}
            className='contacto_container'
            onClick={() => handleContact(contacto.id)}>
            <div className='contac_info'>
                <h2 className='contac_name'>{contacto.name}</h2>
                <p className='contac_estado'>{contacto.estado}</p>
            </div>
            {
                contacto.image
                    ? <img src={contacto.image} alt="avatar" className='img_contac' />
                    : <img src="/Assets/Avatar.png" alt="avatar" className='img_contac' />
            }
        </div>
    )
}

export default GetContacts



