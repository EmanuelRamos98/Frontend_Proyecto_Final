import React, { useState } from 'react'
import { useUsers } from '../Hooks'
import { getAuthenticatedHeaders } from '../Utils/feching'

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
        const response = await fetch('http://localhost:3000/api/contacts/add', {
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
                <h2>Usuarios</h2>
                <input type="text"
                    placeholder='buscar por name..'
                    value={buscar}
                    onChange={handleChange}
                />
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
                                                        key={user._id} 
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
        <div key={user._id}>
            <h2>{user.name}</h2>
            <p>{user.estado}</p>
            <button onClick={() => onAddContact(user.name)}>Agregar Contacto</button>
        </div>
    )
}


export default MostrarUsers