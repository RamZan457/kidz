import Button from "./Button";
import "./ShopNow.css";

const ShopNow = () => {
    return (
        <div className="container">
            <div className="shop-card">
                <img
                    src="https://oneshop.com.pk/wp-content/uploads/2021/01/aaaaaaaa-01.jpg"
                    alt="Outdoor Toys"
                    className="shop-image"
                />
                <button className="shop-now-button">Shop Now</button>
            </div>
            <div className="shop-card">
                <img
                    src="https://oneshop.com.pk/wp-content/uploads/2021/04/oneshop-card-01.jpg"
                    alt="Art & Craft"
                    className="shop-image"
                />
                <button className="shop-now-button">Shop Now</button>
            </div>
            <div className="shop-card">
                <img
                    src="https://oneshop.com.pk/wp-content/uploads/2021/01/vvvvv-01.jpg"
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
