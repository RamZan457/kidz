import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { products } from '../../pages/api';
import { useLocation } from 'react-router-dom';
import './Header.css';
import axios from 'axios';
import { FaCartArrowDown } from 'react-icons/fa';

const Header = () => {
    const [categories, setCategories] = useState([]);
    const [isMobile, setIsMobile] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [searchedProduct, setSearchedProduct] = useState([]);

    // Update searched products whenever search or products change
    useEffect(() => {
        if (search.length >= 3) {
            const filteredProducts = products.filter(product =>
                product.name.toLowerCase().includes(search.toLowerCase())
            );
            setSearchedProduct(filteredProducts);
        }
    }, [search]);

    const handleInputChange = (event) => {
        setSearch(event.target.value);
    };

    const location = useLocation();

    useEffect(() => {
        axios.get(window.ajaxLink + '/categories/get-categories')
            .then(response => {
                setCategories(response.data.categories);
                let cartKey = localStorage.getItem('cartKey');
                if (!cartKey) {
                    localStorage.setItem('cartKey', response.data.cartKey);
                }
            })
            .catch(error => console.log('Error fetching categories:', error));
        const handleResize = () => {
            setIsMobile(window.innerWidth < 850);
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <header className="header">
            <div className="logo">Kidz</div>
            {!isMobile && (
                <nav className="navigation">
                    <Link to="/" className={location.pathname == "/" ? " nav-link active" : "nav-link"}>HOME</Link>
                    <div className="nav-link dropdown">
                        <span>SHOP BY CATEGORY</span>
                        <div className="dropdown-content">
                            {categories.map(category => (
                                <Link to={`/category/${category.categorySlug}`} key={category.id + Math.random().toString()} className="dropdown-item">
                                    {category.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                    <Link to="/about" className={location.pathname == "/about" ? " nav-link active" : "nav-link"}>ABOUT US</Link>
                    <Link to="/contact" className={location.pathname == "/contact" ? " nav-link active" : "nav-link"}>CONTACT US</Link>
                </nav>
            )}
            <div className="header-actions">
                <div className="dropdown">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="search-bar"
                        value={search}
                        onChange={handleInputChange}
                    />
                    {searchedProduct && search.length >= 3 && (
                        <div className="dropdown-content search-content">
                            {searchedProduct.map((product, index) => (
                                <div key={index} className="dropdown-item search-product">
                                    <p>{product.name}</p>
                                    <p>
                                        <sup className='discounted-price'>${(Math.ceil((product.price + 10) * 100) / 100).toFixed(2)}</sup>
                                        <br />
                                        ${product.price}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <Link to="/cart" className={location.pathname == "/cart" ? " nav-link active" : "nav-link"}>
                    <div className="tooltip">
                        <FaCartArrowDown style={{ fontSize: "20px" }} />
                        <span className="tooltiptext">{2}</span>
                    </div>
                </Link>
                {isMobile && <div className="hamburger-menu" onClick={toggleMenu}>&#9776;</div>}
            </div>
            {isMobile && menuOpen && (
                <nav className="mobile-navigation">
                    <Link to="/" className="mobile-nav-link" onClick={toggleMenu}>HOME</Link>
                    <div className="mobile-nav-link dropdown">
                        <span>SHOP BY CATEGORY</span>
                        <div className="dropdown-content">
                            {categories.map(category => (
                                <Link to={`/category/${category.name}`} key={category.id + Math.random().toString()} className="dropdown-item" onClick={toggleMenu}>
                                    {category.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                    {/* <div className="mobile-nav-link dropdown">
                        <span>SHOP BY BRANDS</span>
                         Add similar dropdown content for brands
                    </div> */}
                    <Link to="/about" className="mobile-nav-link" onClick={toggleMenu}>ABOUT US</Link>
                    <Link to="/contact" className="mobile-nav-link" onClick={toggleMenu}>CONTACT US</Link>
                </nav>
            )}
        </header>
    );
};

export default Header;
