import PropTypes from "prop-types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import "./CategoryCarousel.css";

const CategoryCarousel = ({ categories }) => {

    const navigate = useNavigate();
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        setCurrentIndex((prevIndex) =>
            (prevIndex + 3) % categories.length
        );
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) =>
            (prevIndex - 3 + categories.length) % categories.length
        );
    };

    return (
        <div className="carousel-container">
            <button className="carousel-control left" onClick={handlePrev}>
                <FaArrowCircleLeft />
            </button>

            <div className="carousel">
                {categories.slice(currentIndex, currentIndex + 3).map((category, index) => (
                    <div className="carousel-item" key={index} onClick={() => navigate("/category/" + category.name)}>
                        <div
                            className="category-card"
                            style={{ backgroundColor: category.color }}
                        >
                            <div className="card-front">
                                <img src={category.icon} alt={category.name} />
                                <h3>{category.name}</h3>
                            </div>
                            <div className="card-back">
                                <h3>{category.name}</h3>
                                <p>Explore the latest in {category.name}!</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <button className="carousel-control right" onClick={handleNext}>
                <FaArrowAltCircleRight />
            </button>
        </div>
    );
};

export default CategoryCarousel;


// handle props
CategoryCarousel.propTypes = {
    categories: PropTypes.array.isRequired,
};