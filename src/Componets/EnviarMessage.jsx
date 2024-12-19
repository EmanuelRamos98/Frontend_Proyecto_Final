import React from 'react'
import { useForm, useSendMessage } from '../Hooks'
import './enviarMenssage.css'
import { IoSendSharp } from "react-icons/io5";


const EnviarMessage = ({ receiverId }) => {
    const initialForm = { message: '' }
    const { formState, handleChange } = useForm(initialForm)
    const { enviarMensaje } = useSendMessage()

    const handleSubmit = async (e) => {
        e.preventDefault()
        await enviarMensaje(receiverId, formState.message)
    }

    return (
        <div className='container_intput_enviar_mensaje'>
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