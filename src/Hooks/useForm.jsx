import React, { useState } from 'react'

const useForm = (initialForm) => {
    const [formState, setFormState] = useState(initialForm)
    const [errors, setErrors] = useState({ global: '' })

    const handleChange = (event) => {
        const field_name = event.target.name
        const field_value = event.target.value

        setErrors((prevErrors) => ({ ...prevErrors, [field_name]: undefined }))

        setFormState((prevFormState) => {
            return { ...prevFormState, [field_name]: field_value }
        })
    }

    const validationForm = (optionFields = []) => {
        const newErrors = {}

        for (const [field, value] of Object.entries(formState)) {

            /* hace que continue al siguiente cuando sea necesario */
            if (optionFields.includes(field) && !value) continue

            if (!value) {
                newErrors[field] = `${field} es obligatorio`
            } else {
                if (field === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                    newErrors[field] = 'El email no es valido'
                }
                if (field === 'password' && value.length < 8) {
                    newErrors[field] = 'La contraseña debe tener al menos 8 caracteres'
                }
                if (field === 'name' && value.length < 4) {
                    newErrors[field] = 'El nombre debe tener al menos 4 caracteres'
                }
                if (field === 'estado' && value.length > 50) {
                    newErrors[field] = 'El estado no puede tener mas de 50 caracteres'
                }
            }
        }

        return newErrors
    }



    const handleChangeImage = (event, field_name) => {
        const FILE_MB_LIMIT = 2
        const file = event.target.files[0]
        if (file && file.size > FILE_MB_LIMIT * 1024 * 1024) {
            alert('El archivo es muy pesado')
        }
        const reader = new FileReader()

        reader.onloadend = () => {
            const image_base64 = reader.result
            setFormState(
                (prevFormState) => {
                    return { ...prevFormState, [field_name]: image_base64 }
                }
            )
        }

        if (file) {
            reader.readAsDataURL(file)
        }

    }
    return {
        formState,
        handleChange,
        validationForm,
        errors,
        setErrors,
        handleChangeImage
    }
}

export default useForm