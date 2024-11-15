import React, { useState, useEffect } from "react";
import ProductCard from '../components/ProductCard';
import { useParams } from 'react-router-dom';
import { products } from './api';
import './ProductPage.css';
import Pagination from "../components/Pagination";
import NotFound from "../components/NotFound";

const ProductPage = () => {
    const { categorySlug } = useParams();
    const [sortedProducts, setSortedProducts] = useState([]);
    const [sortOption, setSortOption] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchProducts = async () => {
        setLoading(true);
        setError(null);
        try {

            const filteredProducts = products.filter(product => product.categorySlug === categorySlug);

            const sorted = [...filteredProducts].sort((a, b) => {
                if (sortOption === 'priceAsc') return a.price - b.price;
                if (sortOption === 'priceDesc') return b.price - a.price;
                return 0;
            });

            setSortedProducts(sorted);
        } catch (error) {
            setError('Error fetching products');
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [categorySlug, sortOption]);

    const productsPerPage = 6;
    const [currentProducts, setCurrentProducts] = useState([]);

    useEffect(() => {
        setCurrentProducts(sortedProducts.slice(0, productsPerPage));
    }, [sortedProducts]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="product-page">
            <h1>{categorySlug.replace("-", " ").toUpperCase()}</h1>
            <div className="sorting-section">
                <h2>Sort By</h2>
                <select onChange={(e) => setSortOption(e.target.value)}>
                    <option value="">None</option>
                    <option value="priceAsc">Price (Low to High)</option>
                    <option value="priceDesc">Price (High to Low)</option>
                </select>
            </div>

            <React.Fragment>
                {currentProducts.length > 0 && sortedProducts.length > 0 ? (
                    <div className="category-product-grid">
                        {currentProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <NotFound />
                )}
            </React.Fragment>

            <Pagination
                products={sortedProducts}
                setCurrentProducts={setCurrentProducts}
                productsPerPage={productsPerPage}
            />
        </div>
    );
};

export default ProductPage;
