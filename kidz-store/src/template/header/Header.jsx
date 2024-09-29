import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import './Header.css';
import axios from 'axios';

const Header = () => {
    const [categories, setCategories] = useState([]);
    const [isMobile, setIsMobile] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

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
                                <Link to={`/category/${category.categorySlug}`} key={category.id} className="dropdown-item">
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
                <input type="text" placeholder="Search..." className="search-bar" />
                {isMobile && <div className="hamburger-menu" onClick={toggleMenu}>&#9776;</div>}
            </div>
            {isMobile && menuOpen && (
                <nav className="mobile-navigation">
                    <Link to="/" className="mobile-nav-link" onClick={toggleMenu}>HOME</Link>
                    <div className="mobile-nav-link dropdown">
                        <span>SHOP BY CATEGORY</span>
                        <div className="dropdown-content">
                            {categories.map(category => (
                                <Link to={`/category/${category.name}`} key={category.id} className="dropdown-item" onClick={toggleMenu}>
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
