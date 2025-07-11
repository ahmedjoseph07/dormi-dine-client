import React from 'react';
import Banner from '../components/Banner/Banner';
import MealsByCategory from '../components/MealsByCategory/MealsByCategory';

const HomePage = () => {
    return (
        <div>
            <Banner/>
            <MealsByCategory/>
        </div>
    )
};

export default HomePage;