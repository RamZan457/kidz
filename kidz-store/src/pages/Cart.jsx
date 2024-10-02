import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Breadcrum } from '../components/Breadcrum';
import './Cart.css';
import ProductList from '../components/ProductList';
import Alert from "../components/Alert";

const Cart = ({ cart, totalAmount }) => {
  const [cartItems, setCartItems] = useState(cart);
  const [totalPrice, setTotalPrice] = useState(totalAmount);
  const cartKey = localStorage.getItem('cartKey');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  useEffect(() => {
    const fetchCart = async () => {
      if (cartKey) {
        const data = { cartKey };
        await axios.post(window.ajaxLink + '/cart/get-carts', data).then((res) => {
          if (res.data) {
            setCartItems(res.data.items);
            localStorage.setItem('cart', JSON.stringify(res.data.items));
            setTotalPrice(res.data.totalAmount);
          }
        }).catch((err) => {
          console.log(err);
        });
      }
    };
    fetchCart();
  }, []);

  const handleUpdateQuantity = async (cartItemId, event) => {
    setMessage('');
    setMessageType('');
    var newQuantity = parseInt(event.target.value);
    var updatedItems;

    if (newQuantity === "") {
      updatedItems = cartItems.map((item) =>
        item.cartItemId === cartItemId ? { ...item, quantity: newQuantity, price: item.perPiecePrice * newQuantity } : item
      );
    } else if (newQuantity > 0 && newQuantity < 100) {
      updatedItems = cartItems.map((item) =>
        item.cartItemId === cartItemId ? { ...item, quantity: newQuantity, price: item.perPiecePrice * newQuantity } : item
      );
    }
    const newTotal = updatedItems.reduce((acc, item) => acc + item.quantity * item.perPiecePrice, 0);
    setCartItems(updatedItems);
    setTotalPrice(newTotal);

    const data = { cartKey, totalAmount: newTotal, items: updatedItems };
    console.log(data);

    try {
      const res = await axios.put(window.ajaxLink + '/cart/update-cart', data);
      if (res.data) {
        setTimeout(() => {
          setMessage('Quantity is updated!');
          setMessageType('info');
        }, 500);
        localStorage.setItem('cart', JSON.stringify(updatedItems));
      }
    } catch (err) {
      console.error('Error updating cart:', err);
      setTimeout(() => {
        setMessage('Error updating cart!');
        setMessageType('danger');
      }, 500);
    }
  };

  const handleRemoveItem = async (cartItemId) => {
    const updatedItems = cartItems.filter((item) => item.cartItemId !== cartItemId);
    const newTotal = updatedItems.reduce((acc, item) => acc + item.quantity * item.perPiecePrice, 0);
    setCartItems(updatedItems);
    setTotalPrice(newTotal);

    try {
      await axios.post('/api/cart/update', {
        data: {
          cartKey,
          items: updatedItems,
          totalAmount: newTotal,
        },
      });
      setMessage('Product removed successfully!');
      setMessageType('success');
    } catch (error) {
      console.error('Error updating cart:', error);
      setMessage('Error Removing Product!');
      setMessageType('danger');
    }
  };

  const [promoCode, setPromoCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);



  return (
    <div className='cart-main-container'>
      <div className="cart-container">
        <Breadcrum cartLength={cartItems.length} />
        {cartItems.length > 0 ? (
          <>
            <ProductList
              cartItems={cartItems}
              onChangeProductQuantity={handleUpdateQuantity}
              onRemoveProduct={handleRemoveItem}
            />
            {message &&
              <>
                <Alert message={message} type={messageType} />
              </>
            }
          </>
        ) : (
          <div className="empty-product">
            <h3>There are no products in your cart.</h3>
            {/* <button onClick={() => setProducts(PRODUCTS)}>Shop Now</button> */}
          </div>
        )}
        < div className="cart-summary">
          <h3>Total: ${totalPrice}</h3>
        </div>
      </div>
    </div >
  );
};



export default Cart;

Cart.propTypes = {
  cart: PropTypes.array.isRequired,
  totalAmount: PropTypes.number.isRequired
};