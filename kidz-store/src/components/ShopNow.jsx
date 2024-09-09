import Button from "./Button";
import "./ShopNow.css";

const ShopNow = () => {
    return (
        <div className="container">
            <div className="shop-card">
                <img
                    src="https://via.placeholder.com/300"
                    alt="Outdoor Toys"
                    className="shop-image"
                />
                <button className="shop-now-button">Shop Now</button>
            </div>
            <div className="shop-card">
                <img
                    src="https://via.placeholder.com/300"
                    alt="Art & Craft"
                    className="shop-image"
                />
                <button className="shop-now-button">Shop Now</button>
            </div>
            <div className="shop-card">
                <img
                    src="https://via.placeholder.com/300"
                    alt="Building Blocks"
                    className="shop-image"
                />
                <button className="shop-now-button">Shop Now</button>
            </div>
            <div className="banner">
                <div className="banner-content">
                    <h2>One Shop Centaurus Mall</h2>
                    <p>Your Go-to Shop For Birthday Gifts</p>
                    <Button text="Shop Now" />
                </div>
            </div>
        </div>
    );
};

export default ShopNow;
