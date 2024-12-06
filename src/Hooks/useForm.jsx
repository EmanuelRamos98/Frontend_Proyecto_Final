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
    return {
        formState,
        handleChange
    }
}

export default useForm