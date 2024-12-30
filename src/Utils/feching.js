//Funcion para obtener la autentificacion para solicitudes a la API
const getAuthenticatedHeaders = () => {
    //Recuperamos el token almacenado en el sessionStorage
    const access_token = sessionStorage.getItem('access-token')
    // Retornamos un objeto con los encabezados necesarios:
    // - `Authorization`: Incluye el token en formato Bearer.
    // - `Content-Type`: Especifica que el cuerpo de la solicitud será JSON.
    return {
        'Authorization': `Bearer ${access_token}`,
        'content-Type': 'application/json'
    }
}


export { getAuthenticatedHeaders }