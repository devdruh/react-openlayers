import React, { createContext, useState, useContext } from 'react';
import { isDarkTheme } from '../util/utilities';

const DarkThemeContext = createContext();

export const useDarkTheme = () => {
    return useContext(DarkThemeContext);
};

export const DarkThemeProvider = ({ children }) => {
    const [darkTheme, setDarkTheme] = useState(isDarkTheme());

    const switchDarkTheme = (theme) => {
        setDarkTheme(theme);
    };

    return (
        <DarkThemeContext.Provider value={{ darkTheme, switchDarkTheme }}>
            {children}
        </DarkThemeContext.Provider>
    );
};