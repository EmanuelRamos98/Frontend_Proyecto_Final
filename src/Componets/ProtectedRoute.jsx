import { useContext } from "react"
import { AuhtContext } from "../Context/AuthContentx"
import { Navigate, Outlet } from "react-router-dom"


const ProtectedRoute = () => {
    const { is_authenticated_state } = useContext(AuhtContext)
    return (
        <>
            {
                is_authenticated_state
                    ? <Outlet />
                    : <Navigate to={'/'} />
            }
        </>
    )
}

export default ProtectedRoute