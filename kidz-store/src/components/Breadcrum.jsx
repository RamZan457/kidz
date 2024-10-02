import PropTypes from 'prop-types';
import './Breadcrum.css'

export const Breadcrum = ({ cartLength }) => {
    return (
        <>
            <div className="breadcrumb-container">
                <h1>Shopping Cart</h1>
                <ul className="breadcrumb">
                    <li>Home</li>
                    <li>Shopping Cart</li>
                </ul>
                <span className="count">{cartLength} items in the bag</span>
            </div>
        </>
    );
}

Breadcrum.propTypes = {
    cartLength: PropTypes.number
};
