import PropTypes from 'prop-types';
import './ProductList.css'

function ProductList({ cartItems, onChangeProductQuantity, onRemoveProduct }) {
    return (
        <ul className="cart-products">
            {cartItems.map((product, index) => {
                return (
                    <li className="cart-row" key={index}>
                        <div className="cart-col left">
                            <div className="thumbnail">
                                <a href="#">
                                    <img src={product.image} alt={product.name} />
                                </a>
                            </div>
                            <div className="detail">
                                <div className="name">
                                    <a href="#">{product.name}</a>
                                </div>
                                <div className="description">{product.description}</div>

                                <div className="price">${product.price}</div>
                            </div>
                        </div>

                        <div className="cart-col right">
                            <div className="cart-quantity">
                                <input
                                    type="number"
                                    className="cart-quantity"
                                    step="1"
                                    value={product.quantity}
                                    onChange={(event) => onChangeProductQuantity(product.cartItemId, event)}
                                />
                            </div>

                            <div className="cart-remove">
                                <svg
                                    onClick={() => onRemoveProduct(product.cartItemId)}
                                    version="1.1"
                                    className="close"
                                    x="0px"
                                    y="0px"
                                    viewBox="0 0 60 60"
                                    enableBackground="new 0 0 60 60"
                                >
                                    <polygon points="38.936,23.561 36.814,21.439 30.562,27.691 24.311,21.439 22.189,23.561 28.441,29.812 22.189,36.064 24.311,38.186 30.562,31.934 36.814,38.186 38.936,36.064 32.684,29.812" />
                                </svg>
                            </div>
                        </div>
                    </li>
                );
            })}
        </ul>
    );
}

export default ProductList;

ProductList.propTypes = {
    cartItems: PropTypes.array.isRequired,
    onChangeProductQuantity: PropTypes.func,
    onRemoveProduct: PropTypes.func,
}