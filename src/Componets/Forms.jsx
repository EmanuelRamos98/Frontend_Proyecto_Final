import React from 'react'
import { useForm } from '../Hooks'

const Forms = ({ children, action, form_fields, initial_sate_form }) => {
    const { formState, handleChange, errors, validationForm, setErrors } = useForm(initial_sate_form)


    const handleSubmit = async (e) => {
        e.preventDefault()

        const validationsErrors = validationForm()
        if (Object.keys(validationsErrors).length > 0) {
            return setErrors(validationsErrors)
        }
        const data = await action(formState)
        if (!data.ok) {
            setErrors(data.message)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
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
                {error && <span className='error_form'>{error}</span>}
            </>
        </div>
    )
}

export default Forms