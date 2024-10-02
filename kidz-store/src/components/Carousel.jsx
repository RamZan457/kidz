// /Carousel.js
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FaArrowCircleLeft } from "react-icons/fa";
import { FaArrowCircleRight } from "react-icons/fa";
import './Carousel.css';

const Carousel = ({ images, interval = 5000 }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const autoPlayInterval = setInterval(nextSlide, interval);
        return () => {
            clearInterval(autoPlayInterval);
        };
    }, [interval, activeIndex]);

    const nextSlide = () => {
        setActiveIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };
    const prevSlide = () => {
        setActiveIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };
    return (
        <div className="carousel">
            <button onClick={prevSlide} className="carousel__btn carousel__btn--prev">
                <FaArrowCircleLeft />
            </button>
            <img
                src={images[activeIndex]}
                alt={`Slide ${activeIndex}`}
                className="carousel__img"
            />
            <button onClick={nextSlide} className="carousel__btn carousel__btn--next">
                <FaArrowCircleRight />
            </button>
        </div>
    );
};
export default Carousel;

// props validation
Carousel.propTypes = {
    images: PropTypes.array.isRequired,
    interval: PropTypes.number,
};

