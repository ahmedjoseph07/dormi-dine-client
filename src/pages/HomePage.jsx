import React from 'react';
import Banner from '../components/Banner/Banner';
import MealsByCategory from '../components/MealsByCategory/MealsByCategory';
import MemberPerks from '../components/MemberPerks/MemberPerks';
import WeeklyHighlights from '../components/WeeklyHighlights/WeeklyHighlights';
import Membership from '../components/Membership/Membership';
import TestimonialSlider from '../components/TestimonialSlider/TestimonialSlider';

const HomePage = () => {
    return (
        <div>
            <Banner/>
            
            <MealsByCategory/>
            <MemberPerks/>
            <WeeklyHighlights/>
            <Membership/>
            <TestimonialSlider/>
        </div>
    )
};

export default HomePage;