import React from 'react';
import Banner from './Banner';
import Category from './Category';
import PopularMenus from './PopularMenu';
import Featured from './Featured';
import Testimonial from './Testimonial';
import { Helmet } from 'react-helmet-async';

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>fooDie | Home</title>
            </Helmet>
            <Banner/>
            <Category/>
            <PopularMenus/>
            <Featured/>
            <Testimonial/>
        </div>
    );
};

export default Home;