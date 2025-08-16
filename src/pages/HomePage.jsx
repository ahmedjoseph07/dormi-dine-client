import React from 'react';
import Banner from '../components/Banner/Banner';
import MealsByCategory from '../components/MealsByCategory/MealsByCategory';
import MemberPerks from '../components/MemberPerks/MemberPerks';
import WeeklyHighlights from '../components/WeeklyHighlights/WeeklyHighlights';
import Membership from '../components/Membership/Membership';
import TestimonialSlider from '../components/TestimonialSlider/TestimonialSlider';
import FeaturedMeals from '../components/Featuted/FeaturedMeals';

const HomePage = () => {
    return (
        <div>
            <Banner/>
            <FeaturedMeals/>
            <MealsByCategory/>
            <MemberPerks/>
            <WeeklyHighlights/>
            <Membership/>
            <TestimonialSlider/>
        </div>
    )
};

export default HomePage;