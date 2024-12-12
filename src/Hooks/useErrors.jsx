import React, { useState } from 'react'

const useErrors = () => {
    const [errors, setErrors] = useState(null)
    const handleErrors = (data) => {
        if (!data.errors) {
            setErrors(data.message)
        }
        else if (data.errors) {
            setErrors(data.errors[0].message)
        }
        else{
            setErrors(null)
        }
    }
    return {
        errors,
        handleErrors
    }
}

export default useErrors