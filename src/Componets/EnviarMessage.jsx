import React from 'react'
import { useForm, useSendMessage } from '../Hooks'


const EnviarMessage = ({ receiverId }) => {
    const initialForm = { message: '' }
    const { formState, handleChange } = useForm(initialForm)
    const { enviarMensaje } = useSendMessage()

    const handleSubmit = async (e) => {
        e.preventDefault()
        await enviarMensaje(receiverId, formState.message)
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text"
                    id='message'
                    name='message'
                    value={formState.message}
                    onChange={handleChange}
                />
                <button type='submit'>Enviar</button>
            </form>
        </div>
    )
}

export default EnviarMessage