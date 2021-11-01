import { useState } from 'react';

export const useForm = (initialState = {}) => {

    const [values, setValues] = useState(initialState);

    const resetForm = () => {
        setValues(initialState);
    }


    const handleInputChange = ({ target }) => {

        setValues({
            ...values,
            [target.name]: target.value
        });
    }

    const formatearTexto = ({ target }) => {
        setValues({
            ...values,
            [target.name]: target.value.trim()
        });
    }

    return [values, handleInputChange, resetForm, formatearTexto];

}