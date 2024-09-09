import PropTypes from "prop-types";
import { useState } from "react";
import "./ProductSection.css";
import Pagination from "./Pagination";
import ProductCard from "./ProductCard";

const ProductSection = ({ products }) => {
    const productsPerPage = 3;
    const [currentProducts, setCurrentProducts] = useState(products.slice(0, productsPerPage));
    
    return (
        <div className="product-section">
            <h2>Popular In Store</h2>
            <div className="category-product-grid">
                {currentProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
            <Pagination products={products} setCurrentProducts={setCurrentProducts} productsPerPage={productsPerPage} />
        </div>
    );
};

export default ProductSection;

// handle props
ProductSection.propTypes = {
    products: PropTypes.array.isRequired,
};