import { useState } from "react";
export function useField(initialValue=''){

    const [ value, setValue ] = useState(initialValue)

    return {
        value,
        onChange: (e) => {
            setValue(e.target.value)
        }
    }

}