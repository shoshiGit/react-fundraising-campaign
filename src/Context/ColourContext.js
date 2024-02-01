import { createContext, useContext, useState } from "react";

const ColourContext = createContext();


export const ColourProvider = ({ children }) => {
    const [color, setColor] = useState('black');
    const changeColor = () => {
        setColor(color === 'black' ? 'red' : 'black');
    };

    return (
        <ColourContext.Provider value={{ color, changeColor }}>
            {children}
        </ColourContext.Provider>
    );
};
export const useColor = () => {
    return useContext(ColourContext);
}