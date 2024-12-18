import React, { useState } from 'react'

const useForm = (initialForm) => {
    const [formState, setFormState] = useState(initialForm)

    const handleChange = (event) => {
        const field_name = event.target.name
        const field_value = event.target.value

        setFormState((prevFormState) => {
            return { ...prevFormState, [field_name]: field_value }
        })
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
        handleChangeImage
    }
}

export default useForm