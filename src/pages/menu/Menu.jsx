import React from 'react';
import { Helmet } from 'react-helmet-async';
import PageCover from '../shared/PageCover';
import menuBanner from '../../assets/menu/banner3.jpg'
import PopularMenus from '../home/PopularMenu';
import useMenu from '../../hooks/useMenu';
import SectionTitle from '../shared/SectionTitle';
import CategoryMenu from '../shared/CategoryMenu';
import bgImg from '../../assets/home/chef-service.jpg';

const Menu = () => {

    const [menu] = useMenu();
    const dessert = menu.filter(item => item.category === 'dessert');
    const soup = menu.filter(item => item.category === 'soup');
    const salad = menu.filter(item => item.category === 'salad');
    const pizza = menu.filter(item => item.category === 'pizza');
    const offered = menu.filter(item => item.category === 'offered');

    return (
        <div>
            <Helmet>
                <title>fooDie | Menu</title>
            </Helmet>
            
            <PageCover img={menuBanner} title="our menu" description={"Would you like to try a dish?"} ></PageCover>
            

            <SectionTitle 
                heading={"today's offer"}
                subHeading={"don't miss"}
            />
            <CategoryMenu items = {offered} title="offered" />

{/* ..................................................................... */}

            <PageCover img={bgImg} title="desserts" description={"Deserts are good"} ></PageCover>
            <br />
            <CategoryMenu items = {dessert}  title="dessert" />
            
{/* ..................................................................... */}

<PageCover img={bgImg} title="soups" description={"soups are good"} ></PageCover>
            <br />
            <CategoryMenu items = {soup}  title="soup" />
            
{/* ..................................................................... */}

<PageCover img={bgImg} title="salads" description={"salads are good"} ></PageCover>
            <br />
            <CategoryMenu items = {salad}  title="salad" />
            
{/* ..................................................................... */}

<PageCover img={bgImg} title="pizzas" description={"pizzas are good"} ></PageCover>
            <br />
            <CategoryMenu items = {pizza}  title="pizza" />
        </div>
    );
};

export default Menu;