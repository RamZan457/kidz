import PropTypes from 'prop-types';
import { useState } from 'react';
import './ProductCard.css';

const ProductCard = ({ product }) => {
    const [productSize, setProductSize] = useState(product.size[0]);
    const [productColor, setProductColor] = useState(product.colors[0]);

    const handleProductSize = (size) => {
        setProductSize(size);
    };

    const handleProductColor = (color) => {
        setProductColor(color);
    };

    const handleAddToCart = () => {
        alert(`Added ${product.name} to cart, size: ${productSize}, color: ${productColor}`);
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
                            style={{ backgroundColor: color , borderRadius: "50%"}}>
                        </div>
                    ))}
                </div>
            </div>
            <button className="category-add-to-cart-btn" onClick={handleAddToCart} >Add to Cart</button>
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
