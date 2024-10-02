import { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import './Alert.css';

const Alert = ({ message, type }) => {
    const [isVisible, setIsVisible] = useState(true);
    const timeoutRef = useRef(null);

    const closeAlert = (e) => {
        const div = e.target.parentElement;
        div.style.opacity = "0";
        div.style.display = 'none';
        setIsVisible(false);
    };

    useEffect(() => {
        setIsVisible(true);
        clearTimeout(timeoutRef.current);

        timeoutRef.current = setTimeout(() => {
            setIsVisible(false);
        }, 5000);

        return () => {
            clearTimeout(timeoutRef.current);
        };
    }, [type, message]);

    return (
        <div className={`alert ${type.toLowerCase()} ${isVisible ? '' : 'hide'}`}>
            <span className="closebtn" onClick={closeAlert}>&times;</span>
            <strong>{type.charAt(0).toUpperCase() + type.slice(1)}!</strong> {message}
        </div>
    );
};

Alert.propTypes = {
    message: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
};

export default Alert;
