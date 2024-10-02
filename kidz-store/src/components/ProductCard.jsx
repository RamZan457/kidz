// src/components/ProductCard.jsx
import PropTypes from 'prop-types';
import { useState } from 'react';
import './ProductCard.css';
import axios from 'axios';
import Alert from './Alert';
import { FaCartPlus } from 'react-icons/fa';

const ProductCard = ({ product }) => {
    const [productSize, setProductSize] = useState(product.size[0]);
    const [productColor, setProductColor] = useState(product.colors[0]);
    const [productQuantity, setProductQuantity] = useState(1);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');

    const handleProductSize = (size) => {
        setProductSize(size);
    };

    const handleProductColor = (color) => {
        setProductColor(color);
    };

    const handleAddToCart = async () => {
        setMessage('');
        setMessageType('');

        const productToAdd = {
            id: product.id,
            name: product.name,
            price: product.price * productQuantity,
            size: productSize,
            color: productColor,
            quantity: productQuantity,
        };

        const existingCart = JSON.parse(localStorage.getItem('cart')) || [];

        var updatedCart;
        if (existingCart && existingCart.length > 0) {
            updatedCart = [...existingCart, productToAdd];
        } else {
            updatedCart = [productToAdd];
        }

        const totalAmount = updatedCart.reduce((total, item) => total + item.price, 0);

        const cartKey = localStorage.getItem('cartKey');

        if (cartKey) {
            const data = { cartKey, totalAmount, items: updatedCart };
            try {
                const res = await axios.post(window.ajaxLink + '/cart/create-cart', data);
                if (res.data) {
                    setTimeout(() => {
                        setMessage(`${product.name} is added to cart.`);
                        setMessageType('success');
                    }, 500);
                    localStorage.setItem('cart', JSON.stringify(updatedCart));
                }
            } catch (err) {
                console.log(err);
                setTimeout(() => {
                    setMessage(`Error while: ${product.name} is adding to cart.`);
                    setMessageType('danger');
                }, 500);
            }
            setTimeout(() => {
                setMessage('');
                setMessageType('');
            }, 5000);
        }
    };

    const handleProductQuantity = (action) => {
        setProductQuantity(prevQuantity => {
            if (action === 'add') {
                return prevQuantity + 1;
            }
            if (action === 'remove') {
                return prevQuantity > 1 ? prevQuantity - 1 : 1;
            }
            return prevQuantity;
        });
    };

    const handleInputChange = (e) => {
        const value = parseInt(e.target.value, 10);
        if (value > 0) {
            setProductQuantity(value);
        }
    };

    const handleInputKeyPress = (e) => {
        if (e.key === 'Enter') {
            const value = parseInt(e.target.value, 10);
            if (value > 0) {
                setProductQuantity(value);
            }
        }
    };

    return (
        <>
            <div className="category-product-card">
                <div className="image-container">
                    <img src={product.image} alt={product.name} className="category-product-image" />
                </div>
                <div className="category-product-details">
                    <h3 className="product-title">{product.name}</h3>
                    <p className="category-product-description">{product.description}</p>
                    <div className="category-product-info">
                        <span className="product-price">
                            ${product.price}
                            <sup className='discounted-price'>${(Math.ceil((product.price + 10) * 100) / 100).toFixed(2)}</sup>
                        </span>
                        <span className="product-weight">Weight: {product.weight}</span>
                    </div>
                    <div className='product-sizes'>
                        {product.size === "One size" ?
                            <span className="product-size">Size: {product.size}</span>
                            :
                            <>Sizes:
                                {product.size.map((size, index) => (
                                    <div key={index}
                                        onClick={() => handleProductSize(size)}
                                        className={`size-box ${productSize === size ? 'selected' : ''}`}>
                                        {size}
                                    </div>
                                ))}
                            </>
                        }
                    </div>
                    <div className="product-sizes">
                        Colors: {product.colors.map((color, index) => (
                            <div key={index}
                                onClick={() => handleProductColor(color)}
                                className={`size-box ${productColor === color ? 'selected' : ''}`}
                                style={{ backgroundColor: color, borderRadius: "50%" }}>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="product-order">
                    <div className="product-quantity">
                        <div className={`icons ${productQuantity === 1 ? "disabled" : ""}`} onClick={() => handleProductQuantity("remove")}> - </div>
                        <input
                            type="number"
                            className='quantity'
                            value={productQuantity}
                            onChange={handleInputChange}
                            onKeyDown={handleInputKeyPress}
                            min="1"
                            style={{ width: '50px', textAlign: 'center' }}
                        />
                        <div className='icons' onClick={() => handleProductQuantity("add")}> + </div>
                    </div>
                    <button className="category-add-to-cart-btn" onClick={handleAddToCart} ><FaCartPlus /> Add to Cart</button>
                </div>
                {message &&
                    <>
                        <Alert message={message} type={messageType} />
                    </>
                }
            </div>
        </>
    );
};

export default ProductCard;

ProductCard.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        size: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.arrayOf(PropTypes.number),
            PropTypes.arrayOf(PropTypes.string),
        ]).isRequired,
        weight: PropTypes.string.isRequired,
        colors: PropTypes.arrayOf(PropTypes.string).isRequired,
        image: PropTypes.string.isRequired,
    }).isRequired,
};
