import React, { useState, createContext } from 'react'

export const AppContext = createContext({});

export default function AppContextProvider(props) {
    const [darkTheme, setDarkTheme] = useState(false);

    return(
        <AppContext.Provider value={{ darkTheme, setDarkTheme }}>
            {props.children}
        </AppContext.Provider>
    );
}