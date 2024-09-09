import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Footer.css";


const Footer = () => {
    //eslint-disable-next-line
    const [recentProducts, setRecentProducts] = useState([
        {
            slug: "hand-cream-making-kit",
            name: "HAND CREAM MAKING KIT-19-051",
            price: "Rs2,450.00",
        },
        {
            slug: "knitting-unicorn-wall-hanging-kit",
            name: "KNOTTING UNICORN WALL HANGING KIT-22-082",
            price: "Rs1,450.00",
        },
        {
            slug: "candle-bath-bombs-kit",
            name: "CANDLE & BATH BOMBS KIT-22-030",
            price: "Rs2,850.00",
        },
    ]);
    return (
        <React.Fragment>
            <footer className="footer-container">
                <div className="footer-section">
                    <h3>RECENT PRODUCTS</h3>
                    <ul>
                        {recentProducts.map((product, index) => (
                            <li key={index}>
                                <Link to={`/products/${product.slug}`}>{product.name}</Link>
                                <p>{product.price}</p>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="footer-section">
                    <h3>CONTACT DETAILS:</h3>
                    <ul>
                        <li>Address: Shop 23, 3rd Floor, Centaurus Mall, Islamabad</li>
                        <li>Email: <a href="mailto:kidzofficialpk@gmail.com">kidzofficialpk@gmail.com</a></li>
                        <li>Mobile: <a href="tel:+92 311 1122345">+92 311 1122345</a></li>
                        <li>Telephone: <a href="tel:+92 051 1122345">+92 051 1122345</a></li>
                        <li>Website: <a href="www.kidz.com.pk">www.kidz.com.pk</a> </li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h3>GOOGLE MAP</h3>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3319.0470071026325!2d73.04721697441477!3d33.70773253584521!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dfbfb0f4f77379%3A0xf8c50b8651f56d02!2sCentaurus%20Mall!5e0!3m2!1sen!2sus!4v1725704479240!5m2!1sen!2sus"
                        width="300"
                        height="200"
                        allowFullScreen=""
                        loading="lazy"
                        title="Kidz Location"
                        referrerPolicy="no-referrer-when-downgrade">
                        </iframe>
                </div>
            </footer>
            <div className="footer-bottom">
                <p>Kidz © {new Date().getFullYear()}. All rights reserved.</p>
            </div>
        </React.Fragment>
    );
};

export default Footer;
