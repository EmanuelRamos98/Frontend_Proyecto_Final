import React, { useState } from 'react'
import { GetContacts } from '../Componets'
import { Link } from 'react-router-dom'


const HomeScreen = () => {
    const { contactos, loading_contactos, error_contactos } = GetContacts()

    return (
        <div>
            <h1>Warap</h1>
            {
                loading_contactos
                    ? <span>Cargando..</span>
                    : (
                        error_contactos
                            ? <span>{error_contactos}</span>
                            : <div>
                                {
                                    contactos.map(
                                        (contacto) => {
                                            return (
                                                <Contacto contacto={contacto} key={contacto._id}/>
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

const Contacto = ({ contacto }) => {
    return (
        <div key={contacto._id}>
            <h2>{contacto.name}</h2>
            <Link to={`/chat/${contacto._id}`}>Ver</Link>
        </div>
    )
}

export default HomeScreen

