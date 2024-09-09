import React from 'react';
import './Home.css';
import Carousel from '../components/Carousel';
import CategoryCarousel from '../components/CategoryCarousel';
import ProductSection from '../components/ProductSection';
import ShopNow from '../components/ShopNow';
import { products, categories } from './api';

const Home = () => {
    const images = [
        'https://oneshop.com.pk/wp-content/uploads/2020/12/slides-01.jpg',
        'https://oneshop.com.pk/wp-content/uploads/2021/08/oneshop-banner-01.jpg',
        'https://oneshop.com.pk/wp-content/uploads/2021/04/final-01.jpg',
        'https://oneshop.com.pk/wp-content/uploads/2020/12/Cycle-01-01.jpg'
    ];

    return (
        <React.Fragment>
            <div className='home-section'>
                <Carousel images={images} />
                <div className="categories-container">
                    <h2>CATEGORIES</h2>
                    <CategoryCarousel categories={categories} />
                </div>
                <ProductSection products={products} />
                <ShopNow />
            </div>
        </React.Fragment>
    )
}

export default Home;