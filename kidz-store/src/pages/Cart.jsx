import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const Cart = ({ cart, totalAmount }) => {

  return (
      <div>
          <h1>Cart</h1>
          <p>Product Lenght : {cart.length}</p>
          <p>Total Amount : {totalAmount}</p>
    </div>
  )
}

export default Cart;

Cart.propTypes = {
  cart: PropTypes.array.isRequired,
  totalAmount: PropTypes.number.isRequired
};