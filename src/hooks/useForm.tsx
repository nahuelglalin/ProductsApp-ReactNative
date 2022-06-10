import { useState } from 'react';

export const useForm = <T extends Object>( initState: T ) => {
    
    const [state, setState] = useState( initState );

    const onChange = ( value: string, field: keyof T ) => {
        setState({
            ...state,
            [field]: value
        });
    }

    //Para actualizar todo el valor del formulario
    const setFormValue = ( form: T) => {
        setState(form);
    }

    return {
        ...state,
        form: state,
        onChange,
        setFormValue
    }

}