import React, { useState } from 'react'

//Hook para manejar los formularios 
const useForm = (initialForm) => {
    //Seteamos como estado el formulario recibido
    const [formState, setFormState] = useState(initialForm)
    //Estado para el manejo de errores
    // Almacena los errores de validacion
    // Contiene un campo global para errores generales y errores específicos por campo
    const [errors, setErrors] = useState({ global: '' })

    //Funcion para manejar los cambios en los campos del formulario
    const handleChange = (event) => {
        //Capturo el nombre y el valor del campo que se esta modificando
        const field_name = event.target.name
        const field_value = event.target.value

        //Limpio el error del campo en especifico al cambiar su valor
        setErrors((prevErrors) => ({ ...prevErrors, [field_name]: undefined }))

        //Actualizo el estado del formulario con el nuevo valor del campo
        setFormState((prevFormState) => {
            return { ...prevFormState, [field_name]: field_value }
        })
    }


    //Funcion para validar el Formulario
    //Cuenta con el campo 'optionFields' en casos de tenter campos opcionales
    const validationForm = (optionFields = []) => {
        const newErrors = {}

        //Itero sobre los campos y valores del formulario
        for (const [field, value] of Object.entries(formState)) {
            // Si el campo es opcional y esta vacio, continuamos con el siguiente
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
        //Devolvemos el objeto con los errores encontrados
        return newErrors
    }


    //Funcion para manejar los cambios en las imagenes
    const handleChangeImage = (event, field_name) => {
        const FILE_MB_LIMIT = 2
        const file = event.target.files[0]
        if (file && file.size > FILE_MB_LIMIT * 1024 * 1024) {
            alert('El archivo es muy pesado')
        }
        
        const reader = new FileReader()//Instanciamos FileReader para convertir el archivo en Base64
        //Cuando el archivo se haya cargado, actualizo el estado del formulario con la imagen
        reader.onloadend = () => {
            const image_base64 = reader.result
            setFormState(
                (prevFormState) => {
                    return { ...prevFormState, [field_name]: image_base64 }
                }
            )
        }

        //Si hay un archivo valido, lo leemos como una cadena base64
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