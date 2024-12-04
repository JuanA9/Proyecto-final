import React, { createContext, useState } from 'react';

// Crear el contexto
export const AsistenciaContext = createContext();

// Proveedor del contexto
export const AsistenciaProvider = ({ children }) => {
    const [asistencia, setAsistencia] = useState([]); // Estado inicial

    return (
        <AsistenciaContext.Provider value={{ asistencia, setAsistencia }}>
            {children}
        </AsistenciaContext.Provider>
    );
};
