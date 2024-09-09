// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './template/header/Header';
import Footer from './template/footer/Footer';
import './App.css';
import Home from './pages/Home';
import ProductPage from './pages/ProductPage';
import NotFound from './components/NotFound';

const App = () => {
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
        <Route path="/cart" element={<h1>Cart Page</h1>} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
