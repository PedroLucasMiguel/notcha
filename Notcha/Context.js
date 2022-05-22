import React, { useState, createContext } from 'react'

/*
    Aqui se encontra toda a parte de "context" da aplicação.

    É aqui que fazemos o controle da logica envolvendo o "dark-theme", e que
    futuramente também dara suporte a implementação do firebase e do uso
    do sistema de arquivos do dispositivo.
*/

export const AppContext = createContext({});

export default function AppContextProvider(props) {
    const [darkTheme, setDarkTheme] = useState(false);

    return(
        <AppContext.Provider value={{ darkTheme, setDarkTheme }}>
            {props.children}
        </AppContext.Provider>
    );
}