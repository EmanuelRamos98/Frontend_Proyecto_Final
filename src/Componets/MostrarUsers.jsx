import React, { useState } from 'react'
import { useUsers } from '../Hooks'
import { getAuthenticatedHeaders } from '../Utils/feching.js'
import { FaPlus } from "react-icons/fa6"
import './getContac.css'
import Skeleton from 'react-loading-skeleton'

//Componente para mostrar todos los usuarios que contiene la app
const MostrarUsers = () => {
    //Utilizo el Hook para obtener el estado de los usuarios
    const { user_state, user_Loading_state, user_error_state } = useUsers()
    //Estado del valor de busqueda
    const [buscar, setBuscar] = useState('')

    //Funcion para manejar los cambios en el campo de busqueda
    const handleChange = (event) => {
        setBuscar(event.target.value)
    }

    //Filtra los usuarios basandose en el valor de busqueda
    const buscarUser = user_state.filter(user =>
        user.name.toLowerCase().includes(buscar.toLowerCase())
    )

    //Funcion para agregar un contacto mediante una solicitud Post
    const handleAddContact = async (contactUsername) => {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/contacts/add`, {
            method: 'POST',
            headers: getAuthenticatedHeaders(),
            body: JSON.stringify({ contact_username: contactUsername })//Enviamos el username del contacto
        })
        const data = await response.json()
    }


    return (
        <div>
            <div>
                {/* Input para buscar los usuarios */}
                <div className='container_input_bucar'>
                    <input type="text"
                        placeholder='Buscar...'
                        value={buscar}
                        onChange={handleChange}
                        className='input_bucar'
                    />
                </div>
                {
                    user_Loading_state
                        ? <div>
                            {/* Mostramos los skeletons simulando una cantidad de contactos ya que todavia no la tenemos */}
                            {(() => {
                                const skeleton = []
                                for (let i = 0; i < 3; i++) {
                                    skeleton.push(<UserSkeleton key={i} />)
                                }
                                return skeleton
                            })()}
                        </div>
                        : (
                            user_error_state
                                ? <span>{user_error_state}</span>
                                : <div>
                                    {
                                        buscarUser.map(
                                            (user) => {
                                                return (
                                                    <User
                                                        user={user}
                                                        key={user.id}
                                                        onAddContact={handleAddContact} //Paso la funcion para agregar el usuario a la lista de contactos
                                                    />
                                                )
                                            }
                                        )
                                    }
                                </div>
                        )
                }
            </div>
        </div>
    )
}

//Componente para mostrar cada usuario
const User = ({ user, onAddContact }) => {
    return (
        <div key={user.id}
            className='contacto_container user_contact_container'
        >
            {/* Boton para agregar contacto */}
            <button onClick={() => onAddContact(user.name)}
                className='btn_agregar_contacto'>
                <FaPlus />
            </button>

            <div className='container_info'>
                <div className='contac_info'>
                    <h2 className='contac_name'>{user.name}</h2>
                    <p className='contac_estado'>{user.estado}</p>
                </div>
                {
                    user.image
                        ? <img src={user.image} alt="avatar" className='img_contac' />
                        : <img src="/Assets/Avatar.png" alt="avatar" className='img_contac' />
                }
            </div>

        </div>
    )
}

const UserSkeleton = () => {
    return (
        <div className='contacto_container user_contact_containerer_info'>
            <div className='container_info'>
                <div className='contac_info'>
                    <h2 className='contac_name'><Skeleton width={100} style={{ opacity: 0.5 }} /></h2>
                    <p className='contac_estado'><Skeleton width={150} style={{ opacity: 0.5 }} /></p>
                </div>
                <span className='img_contac'><Skeleton circle height={50} width={50} style={{ opacity: 0.5 }} /></span>
            </div>
        </div>
    )
}

export default MostrarUsers