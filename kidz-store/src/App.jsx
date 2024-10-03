// src/App.jsx
import { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './template/header/Header';
import Footer from './template/footer/Footer';
import './App.css';
import Home from './pages/Home';
import ProductPage from './pages/ProductPage';
import NotFound from './components/NotFound';
import axios from 'axios';
import Cart from './pages/Cart';
import { CartLength } from './context/CartLengthContext';

const App = () => {
  const [cart, setCart] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const { setItemLength } = useContext(CartLength);

  useEffect(() => {
    const fetchCart = async () => {
      const cartKey = localStorage.getItem('cartKey');
      if (cartKey) {
        const data = { cartKey };
        await axios.post(window.ajaxLink + '/cart/get-carts', data).then((res) => {
          if (res.data) {
            setCart(res.data.items);
            setItemLength(res.data.items.length);
            localStorage.setItem('cart', JSON.stringify(res.data.items));
            setTotalAmount(res.data.totalAmount);
          }
        }).catch((err) => {
          console.log(err);
        });
      }
    };
    fetchCart();
  }, [setItemLength]);


  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/category/:categorySlug' element={<ProductPage />} />
        <Route path="/categories" element={<h1>Categories Page</h1>} />
        <Route path="/products" element={<h1>Products Page</h1>} />
        <Route path="/about" element={<h1>About Us Page</h1>} />
        <Route path="/contact" element={<h1>Contact Page</h1>} />
        <Route path="/cart" element={<Cart cart={cart} totalAmount={totalAmount} />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
