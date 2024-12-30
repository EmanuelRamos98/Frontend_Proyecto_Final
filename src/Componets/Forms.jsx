import React from 'react'
import { useForm } from '../Hooks'

//Componente para manejar de forma universal los Formularios de la app
const Forms = ({ children, action, form_fields, initial_sate_form }) => {
    //Importo del Hook los elementos necesarios
    const { formState, handleChange, errors, validationForm, setErrors } = useForm(initial_sate_form)

    //Funcion que maneja el submit del formulario
    const handleSubmit = async (e) => {
        e.preventDefault()
        //Realiza la validacion del formulario
        const validationsErrors = validationForm()
        if (Object.keys(validationsErrors).length > 0) {
            //Si hay errores de validacion, actualiza el estado de errores
            return setErrors(validationsErrors)
        }
        //Si no hay errores, envia los datos del formulario a la accion definida
        const data = await action(formState)
        //Si hay un error se muestra
        if (!data.ok) {
            setErrors(data.message)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            {/* Muestra el erro global si existe */}
            {errors.global && <span className="error_global">{errors.global}</span>}
            <FieldList
                form_fields={form_fields}
                handleChange={handleChange}
                form_state={formState}
                errors={errors}
            />
            {children}
        </form>
    )
}

const FieldList = ({ form_fields, handleChange, form_state, errors }) => {
    return (
        form_fields.map((field, index) => {
            //Mapea sobre los campos del formulario y renderiza el componente Field para cada uno
            return (
                <Field
                    key={index + field.field_data_props.name}
                    field={field}
                    handleChange={handleChange}
                    state_value={form_state[field.field_data_props.name]}
                    error={errors[field.field_data_props.name]}
                />
            )
        })
    )
}

const Field = ({ field, handleChange, state_value, error }) => {
    return (
        <div {...field.field_container_props}>
            {field.label_text && <label>{field.label_text}</label>}
            <>
                {
                    field.field_component === 'INPUT'
                        ? <input onChange={handleChange} value={state_value} {...field.field_data_props} />
                        : <textarea></textarea>
                }
                {/* Muestra el error si existe */}
                {error && <span className='error_form'>{error}</span>}
            </>
        </div>
    )
}

export default Forms