import React from 'react'
import './modalProfile.css'


const ModalProfileContac = ({ isOpen, onClose, children }) => {
    if (!isOpen) {
        return null
    }
    return (
        <div className="modal_profile" onClick={onClose}>
            <div className="modal_content" onClick={(e) => e.stopPropagation()}>
                <button className="btn_modal_close" onClick={onClose}>
                    x
                </button>
                {children}
            </div>
        </div>
    )
}

export default ModalProfileContac