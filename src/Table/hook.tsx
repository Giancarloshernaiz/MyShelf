import { useState } from 'react';
import instance from '@/axios/config';

function useCustomHook() {
    const [datos, setDatos] = useState();

    const actualizar = () => {
        instance.get("/libros").then((response) => {
            setDatos(response.data);
        });
     }

    // Aquí puedes agregar la lógica adicional que necesites para tu hook
    return {
        datos,
        actualizar
    };
}

export default useCustomHook;