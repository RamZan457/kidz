import React, { useState } from "react";
import ProductCard from '../components/ProductCard';
import { useParams } from 'react-router-dom';
import { products } from './api';
import './ProductPage.css';
import Pagination from "../components/Pagination";
import NotFound from "../components/NotFound";

const ProductPage = () => {
    const { categorySlug } = useParams();
    const filteredProducts = products.filter(product => product.categorySlug === categorySlug);
    const [sortOption, setSortOption] = useState('');
    const sortedProducts = [...filteredProducts].sort((a, b) => {
        if (sortOption === 'priceAsc') return a.price - b.price;
        if (sortOption === 'priceDesc') return b.price - a.price;
        if (sortOption === 'sizeAsc') return a.size - b.size;
        if (sortOption === 'sizeDesc') return b.size - a.size;
        return 0;
    });
    const productsPerPage = 6;

    const [currentProducts, setCurrentProducts] = useState(sortedProducts.slice(0, productsPerPage));

    return (
        <div className="product-page">
            <h1>{categorySlug.replace("-", " ").toUpperCase()}</h1>
            <div className="sorting-section">
                <h2>Sort By</h2>
                <select onChange={(e) => setSortOption(e.target.value)}>
                    <option value="">None</option>
                    <option value="priceAsc">Price (Low to High)</option>
                    <option value="priceDesc">Price (High to Low)</option>
                    <option value="sizeAsc">Size (Small to Large)</option>
                    <option value="sizeDesc">Size (Large to Small)</option>
                </select>
            </div>

            <React.Fragment>
            {currentProducts.length > 0 ? (
                    <div className="category-product-grid">
                        {currentProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
            ) : (
                // <h2>No products found</h2>
                <NotFound />
            )}
            </React.Fragment>

            <Pagination products={sortedProducts} setCurrentProducts={setCurrentProducts} productsPerPage={productsPerPage} />
        </div>
    );
};

export default ProductPage;
