// src/components/ProductCard.jsx
import PropTypes from 'prop-types';
import { useState, useContext } from 'react';
import './ProductCard.css';
// import { cartContext } from '../contextApi/cartContext';
import axios from 'axios';

const ProductCard = ({ product }) => {
    // var { addToCart,cart, totalAmount,addCartKey } = useContext(cartContext);
    const [productSize, setProductSize] = useState(product.size[0]);
    const [productColor, setProductColor] = useState(product.colors[0]);
    const [productQuantity, setProductQuantity] = useState(1);

    const handleProductSize = (size) => {
        setProductSize(size);
    };

    const handleProductColor = (color) => {
        setProductColor(color);
    };

    const handleAddToCart = async () => {
        const productToAdd = {
            id: product.id,
            name: product.name,
            price: product.price,
            size: productSize,
            color: productColor,
            quantity: productQuantity,
        };
        
        // addToCart(...product, productToAdd);

        const data = {
            items: [productToAdd],
            totalAmount: productQuantity * product
        };

        const cartKey = localStorage.getItem('cartKey');

        if (cartKey) {
            data.cartKey = cartKey;
           await axios.put(window.ajaxLink + '/cart/update-cart', { data }).then((res) => {
               // addToCart(res.data.items);
               console.log(res.data.items);
           }).catch((err) => {
                console.log(err);
           });
        } else {
            await axios.post(window.ajaxLink + '/cart/create-cart', data).then((res) => {
                if (res.data) {
                    // addCartKey(res.data.cartKey);
                    localStorage.setItem('cartKey', res.data.cartKey);
                }
            }).catch((err) => {
                console.log(err);
            });
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
        <div className="category-product-card">
            <div className="image-container">
                <img src={product.image} alt={product.name} className="category-product-image" />
            </div>
            <div className="category-product-details">
                <h3 className="product-title">{product.name}</h3>
                <p className="category-product-description">{product.description}</p>
                <div className="category-product-info">
                    <span className="product-price">${product.price}</span>
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
                <button className="category-add-to-cart-btn" onClick={handleAddToCart} >Add to Cart</button>
            </div>
        </div>
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
