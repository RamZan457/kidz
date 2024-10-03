// src/context/CartLengthContext.js
import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const CartLength = createContext();


const CartLengthProvider = ({ children }) => {
    const [itemLength, setItemLength] = useState(0);

    return (
        <CartLength.Provider value={{ itemLength, setItemLength }}>
            {children}
        </CartLength.Provider>
    );
};

export { CartLengthProvider, CartLength };

// Add prop types validation (optional)
CartLengthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};