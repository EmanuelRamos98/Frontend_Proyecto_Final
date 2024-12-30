import React from 'react'
import { useForm, useSendMessage } from '../Hooks'
import './enviarMenssage.css'
import { IoSendSharp } from "react-icons/io5";

//Componente que se encarga de enviar los mensajes
const EnviarMessage = ({ receiverId }) => {   
    const initialForm = { message: '' }//Estado del formulario
    const { formState, handleChange } = useForm(initialForm)//Importamos los elementos necesarios del Hook
    const { enviarMensaje, error_message } = useSendMessage()//Importamos los elementos necesarios del Hook

    //Funcion submit para enviar mensajes
    const handleSubmit = async (e) => {
        e.preventDefault()
        await enviarMensaje(receiverId, formState.message)
    }

    return (
        //Formulario para enviar mensajes
        <div className='container_intput_enviar_mensaje'>
            {
                error_message &&
                <span className='error_message'>{error_message}</span>
                //Mostramos el error en caso de haber
            }
            <form onSubmit={handleSubmit}
                className='form_enviar_mensaje'
            >
                <input type="text"
                    id='message'
                    name='message'
                    value={formState.message}
                    onChange={handleChange}
                    placeholder='Enviar mensaje'
                    className='input_enviar_mensaje'
                />
                <button type='submit'
                    className='btn_enviar_mensaje'
                ><IoSendSharp /></button>
            </form>
        </div>
    )
}

export default EnviarMessage