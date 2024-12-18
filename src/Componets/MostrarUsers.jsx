import React, { useState } from 'react'
import { useUsers } from '../Hooks'
import { getAuthenticatedHeaders } from '../Utils/feching.js'
import { FaPlus } from "react-icons/fa6"
import './getContac.css'

const MostrarUsers = () => {
    const { user_state, user_Loading_state, user_error_state } = useUsers()
    const [buscar, setBuscar] = useState('')

    const handleChange = (event) => {
        setBuscar(event.target.value)
    }
    const buscarUser = user_state.filter(user =>
        user.name.toLowerCase().includes(buscar.toLowerCase())
    )

    const handleAddContact = async (contactUsername) => {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/contacts/add`, {
            method: 'POST',
            headers: getAuthenticatedHeaders(),
            body: JSON.stringify({ contact_username: contactUsername })
        })
        const data = await response.json()
        console.log(data)
    }


    return (
        <div>
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
                    user_Loading_state
                        ? <span>Cargando</span>
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
                                                        onAddContact={handleAddContact}
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

const User = ({ user, onAddContact }) => {
    return (
        <div key={user.id}
            className='contacto_container user_contact_container'
        >
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


export default MostrarUsers