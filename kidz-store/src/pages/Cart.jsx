import PropTypes from 'prop-types';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Breadcrum } from '../components/Breadcrum';
import './Cart.css';
import ProductList from '../components/ProductList';
import Alert from "../components/Alert";
import { CartLength } from '../context/CartLengthContext';
import Summary from '../components/Summary';

const Cart = ({ cart, totalAmount }) => {
  const [cartItems, setCartItems] = useState(cart);
  const [totalPrice, setTotalPrice] = useState(0);
  const [total, setTotal] = useState(totalAmount);
  const cartKey = localStorage.getItem('cartKey');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const { setItemLength } = useContext(CartLength);

  const [promoCode, setPromoCode] = useState("");
  const [totalDiscount, setTotalDiscount] = useState(0);
  const discount = (totalPrice * totalDiscount) / 100;

  const PROMOTIONS = [
    {
      code: "SUMMER",
      discount: "50%"
    },
    {
      code: "AUTUMN",
      discount: "40%"
    },
    {
      code: "WINTER",
      discount: "30%"
    }
  ];
  const [deliveryTax, setDeliveryTax] = useState(200);

  useEffect(() => {
    const fetchCart = async () => {
      if (cartKey) {
        const data = { cartKey };
        await axios.post(window.ajaxLink + '/cart/get-carts', data).then((res) => {
          if (res.data) {
            setCartItems(res.data.items);
            localStorage.setItem('cart', JSON.stringify(res.data.items));
            setItemLength(res.data.items.length);
            setTotal(res.data.totalAmount + res.data.deliveryTax);
            setTotalPrice(res.data.totalAmount);
            setDeliveryTax(res.data.deliveryTax);
          }
        }).catch((err) => {
          console.log(err);
        });
      }
    };
    fetchCart();
  }, [cartKey, setItemLength, deliveryTax]);

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
    setTotal(newTotal + deliveryTax);

    const data = { cartKey, totalAmount: newTotal + deliveryTax, items: updatedItems, deliveryTax: deliveryTax };

    try {
      const res = await axios.put(window.ajaxLink + '/cart/update-cart', data);
      if (res.data) {
        setTimeout(() => {
          setMessage('Quantity is updated!');
          setMessageType('info');
        }, 500);
        localStorage.setItem('cart', JSON.stringify(updatedItems));
        setItemLength(updatedItems.length);
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
    setMessage('');
    setMessageType('');
    const updatedItems = cartItems.filter((item) => item.cartItemId !== cartItemId);
    const newTotal = updatedItems.reduce((acc, item) => acc + item.quantity * item.perPiecePrice, 0);
    setCartItems(updatedItems);
    setTotalPrice(newTotal);
    setTotal(newTotal + deliveryTax);

    const data = { cartKey, totalAmount: newTotal + deliveryTax, items: updatedItems, deliveryTax, totalDiscount };
    if (updatedItems.length == 0 || newTotal == 0) {
      try {
        const res = await axios.post(window.ajaxLink + '/cart/delete-cart', data);
        if (res.data) {
          setTimeout(() => {
            setMessage('Product removed successfully!');
            setMessageType('success');
          }, 500);
          localStorage.setItem('cart', JSON.stringify([]));
          setItemLength(0);
        }
      } catch (err) {
        console.error('Error deleting product:', err);
        setTimeout(() => {
          setMessage('Error deleting product!');
          setMessageType('danger');
        }, 500);
      }
    } else {
      try {
        const res = await axios.put(window.ajaxLink + '/cart/update-cart', data);
        if (res.data) {
          setTimeout(() => {
            setMessage('Product removed successfully!');
            setMessageType('success');
          }, 500);
          localStorage.setItem('cart', JSON.stringify(updatedItems));
          setItemLength(updatedItems.length);
        }
      } catch (err) {
        console.error('Error deleting product:', err);
        setTimeout(() => {
          setMessage('Error deleting product!');
          setMessageType('danger');
        }, 500);
      }
    }
  };

  const onEnterPromoCode = (event) => {
    setPromoCode(event.target.value);
  };

  const checkPromoCode = () => {
    for (var i = 0; i < PROMOTIONS.length; i++) {
      if (promoCode === PROMOTIONS[i].code) {
        setTotalDiscount(parseFloat(PROMOTIONS[i].discount.replace("%", "")));
        return;
      }
    }

    alert("Sorry, the Promotional code you entered is not valid!");
  };

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
            <Summary
              total={total}
              setTotal={setTotal}
              subTotal={totalPrice}
              discount={discount}
              tax={deliveryTax}
              onEnterPromoCode={onEnterPromoCode}
              checkPromoCode={checkPromoCode}
            />
          </>
        ) : (
          <div className="empty-product">
            <h3>There are no products in your cart.</h3>
            {/* <button onClick={() => setProducts(PRODUCTS)}>Shop Now</button> */}
          </div>
        )}
      </div>
    </div >
  );
};



export default Cart;

Cart.propTypes = {
  cart: PropTypes.array.isRequired,
  totalAmount: PropTypes.number.isRequired
};