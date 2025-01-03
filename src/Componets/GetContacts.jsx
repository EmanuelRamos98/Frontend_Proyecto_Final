import React, { useState } from 'react'
import { useContact } from '../Hooks'
import { Link } from 'react-router-dom'
import ChatScreen from '../Screens/ChatScreen'
import { useChat } from '../Context/ChatContext'
import './getContac.css'
import Skeleton from 'react-loading-skeleton'


const GetContacts = () => {
    //Usa el contexto para setear el contacto seleccionado
    const { setSelectedContacId } = useChat()
    const { contactos, loading_contactos, error_contactos } = useContact()//Llama al Hook para utilizar los elementos necesarios
    const [buscar, setBuscar] = useState('')//Estado para setear la busqueda

    //Funcion que maneja el cambio en el imput de busqueda
    const handleChange = (event) => {
        setBuscar(event.target.value)
    }

    //Filtra los contactos basandose en el valor de busqueda
    const bucarContact = Array.isArray(contactos)
        ? contactos.filter(contacto =>
            contacto && contacto.name && contacto.name.toLowerCase().includes(buscar.toLowerCase())
        )
        : [];


    //Funcion para setear el id del contacto en el contexto
    const handleContact = (contacId) => {
        setSelectedContacId(contacId)
    }

    return (
        <div>
            {/* Input de busqueda de contactos */}
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
                    ? <div>
                        {/* Mostramos los skeletons simulando una cantidad de contactos ya que todavia no la tenemos */}
                        {(() => {
                            const skeleton = []
                            for (let i = 0; i < 3; i++) {
                                skeleton.push(<ContactoSkeleton key={i} />)
                            }
                            return skeleton
                        })()}
                    </div>
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


const ContactoSkeleton = () => {
    return (
        <div className='contacto_container'>
            <div className='contac_info'>
                <h2 className='contac_name'><Skeleton width={100} style={{ opacity: 0.5 }} /></h2>
                <p className='contac_estado'><Skeleton width={150} style={{ opacity: 0.5 }} /></p>
            </div>
            <span className='img_contac'><Skeleton circle height={50} width={50} style={{ opacity: 0.5 }} /></span>
        </div>

    )
}
export default GetContacts



