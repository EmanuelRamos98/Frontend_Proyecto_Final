import React, { useState } from 'react'
import { useContact } from '../Hooks'
import { Link } from 'react-router-dom'

const GetContacts = () => {
    const { contactos, loading_contactos, error_contactos } = useContact()
    const [buscar, setBuscar] = useState('')

    const handleChange = (event) => {
        setBuscar(event.target.value)
    }

    const bucarContact = contactos.filter(contacto =>
        contacto.name.toLowerCase().includes(buscar.toLocaleLowerCase())
    )

    return (
        <div>
            <input type="text"
                placeholder='buscar...'
                value={buscar}
                onChange={handleChange}
            />

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
                                                <Contacto contacto={contacto} key={contacto._id} />
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

export default GetContacts



