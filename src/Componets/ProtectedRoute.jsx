import { useContext } from "react"
import { Navigate, Outlet } from "react-router-dom"
import { AuthContext } from "../Context/AuthContentx"

//Protegemos las rutas segun el estado de autenticacion
const ProtectedRoute = () => {
    //Obtengo el valor de la autenticacion y el estado de verificacion 
    const { is_authenticated_state, is_authenticated_checked } = useContext(AuthContext)

    //Si el estado de autenticacion aun no ha sido verificado, muestro el mensaje de cargando
    if (!is_authenticated_checked) {
        return <div>Cargando...</div>
    }
    return (
        <>
            {
                //Si el usuario esta autenticado, muestro el contenido de la ruta protegida
                is_authenticated_state
                    ? <Outlet />
                    //Sino volvemos al login
                    : <Navigate to={'/login'} />
            }
        </>
    )
}

export default ProtectedRoute