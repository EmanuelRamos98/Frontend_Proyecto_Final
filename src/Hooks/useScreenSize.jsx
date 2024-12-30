import React, { useEffect, useState } from 'react'

//Hook personalizado para detectar el tipo de pantalla
const useScreenSize = () => {
    //Defino el estado, si es o no mobile
    //Utilizo para evaluar la condicion 'window.innerWidth'
    const [isMobile, setIsMobile] = useState(window.innerWidth < 770)

    useEffect(() => {
        //Esta funcion actualiza el estado isMobile cada vez que cambia el tamaño de la ventana
        const handleResize = () => setIsMobile(window.innerWidth < 770)
        //Utilizo el evento 'resize' del objeto 'window' para escuchar los cambios en el tamaño
        window.addEventListener('resize', handleResize)
        //Elimino el evento 'resize' para evitar errores en caso de que se vuelva a ejecutar
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    //Retorno el estado para saber si esat en modo mobil o desktop
    return {
        isMobile
    }
}

export default useScreenSize