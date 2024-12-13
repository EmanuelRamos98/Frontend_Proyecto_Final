import React, { useState } from 'react'
import { GetContacts, MostrarUsers } from '../Componets'


const HomeScreen = () => {
    const [mostrar, setMostrar] = useState(false)

    const handleCkick = () => {
        setMostrar((prevState) => !prevState)
    }

    
    return (
        <div>
            <h1>Warap</h1>
                <GetContacts />
            <button onClick={handleCkick}>Buscar contactos</button>
            {
                mostrar
                &&
                <span>
                    <MostrarUsers />
                </span>
            }
        </div>
    )
}

export default HomeScreen

