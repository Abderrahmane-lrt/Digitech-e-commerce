import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(() => {
        // Force light mode as default for new users or if no preference is set
        return localStorage.getItem('digitech-theme-v2') || 'light';
    });

    useEffect(() => {
        const root = window.document.documentElement;
        
        // Remove existing classes
        root.classList.remove('light', 'dark');
        
        // Add current theme class
        root.classList.add(theme);
        
        // Persist to local storage
        localStorage.setItem('digitech-theme-v2', theme);
        
        // Also set data-theme attribute for daisyUI or other tools if needed
        root.setAttribute('data-theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    };

    return (
        <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
