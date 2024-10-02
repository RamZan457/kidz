import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./Pagination.css";

const Pagination = ({ products, setCurrentProducts, productsPerPage }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const PAGE_LIMIT = 5;

    const totalPages = Math.ceil(products.length / productsPerPage);

    useEffect(() => {
        setCurrentProducts(products.slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage));
    }, [currentPage, setCurrentProducts, productsPerPage]);

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const generatePageNumbers = () => {
        let startPage, endPage;

        if (totalPages <= PAGE_LIMIT) {
            startPage = 1;
            endPage = totalPages;
        } else {
            if (currentPage <= PAGE_LIMIT - 2) {
                startPage = 1;
                endPage = PAGE_LIMIT;
            } else if (currentPage + 2 >= totalPages) {
                startPage = totalPages - (PAGE_LIMIT - 1);
                endPage = totalPages;
            } else {
                startPage = currentPage - Math.floor(PAGE_LIMIT / 2);
                endPage = currentPage + Math.floor(PAGE_LIMIT / 2);
            }
        }
        const pages = [];
        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        return pages;
    };

    const pages = generatePageNumbers();
    return (
        <React.Fragment>
            {totalPages > 1 && (
                <div className="pagination">
                    {currentPage !== 1 && totalPages > 4 && (
                        <button className="prev-btn" onClick={handlePrevPage}>
                            &lt;
                        </button>
                    )}

                    {totalPages > PAGE_LIMIT && currentPage > PAGE_LIMIT && (
                        <button className="page-btn" onClick={() => setCurrentPage(1)}>
                            1
                        </button>
                    )}

                    {totalPages > PAGE_LIMIT && currentPage > PAGE_LIMIT && (
                        <button className="page-btn">
                            ...
                        </button>
                    )}

                    {pages.map((num) => (
                        <button
                            key={num}
                            className={`page-btn ${num === currentPage ? 'active' : ''}`}
                            onClick={() => setCurrentPage(num)}
                        >
                            {num}
                        </button>
                    ))}

                    {totalPages > PAGE_LIMIT && currentPage < totalPages - PAGE_LIMIT + 1 && (
                        <span className="ellipsis">...</span>
                    )}

                    {totalPages > PAGE_LIMIT && currentPage < totalPages - PAGE_LIMIT + 1 && (
                        <button className="page-btn" onClick={() => setCurrentPage(totalPages)}>
                            {totalPages}
                        </button>
                    )}

                    {currentPage !== totalPages && totalPages > 4 && (
                        <button className="next-btn" onClick={handleNextPage}>
                            &gt;
                        </button>
                    )}
                </div>
            )}
        </React.Fragment>
    )
}

export default Pagination;

Pagination.propTypes = {
    products: PropTypes.array.isRequired,
    setCurrentProducts: PropTypes.func.isRequired,
    productsPerPage: PropTypes.number.isRequired,
};