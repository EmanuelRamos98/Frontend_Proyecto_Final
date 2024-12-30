import React from 'react'
import './modalProfile.css'

//Componente modal
const ModalProfileContac = ({ isOpen, onClose, children }) => {
    //Verificamos si se muestra o no
    if (!isOpen) {
        return null//Si es nuul no se muestra
    }

    return (
        <div className="modal_profile" onClick={onClose}>
            {/* Contenido del modal */}
            <div className="modal_content" onClick={(e) => e.stopPropagation()}>
                {/* Asigno el stopPropagation para evitar la propagacion del evento a otros elementos */}
                <button className="btn_modal_close" onClick={onClose}>
                    x
                </button>
                {children}{/* Renderizo los elementos hijos que se pasan al componenete */}
            </div>
        </div>
    )
}

export default ModalProfileContac