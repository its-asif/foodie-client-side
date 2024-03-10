import React, { useState } from 'react';
import PageCover from '../shared/PageCover';
import menuBanner from '../../assets/shop/banner2.jpg';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import useMenu from '../../hooks/useMenu';
import FoodCard from '../shared/FoodCard';
import OrderTab from './OrderTab';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const OrderFood = () => {
    const categories = ['salad', 'pizza', 'soup', 'dessert', 'drinks'];
    
    const {category} = useParams();
    const initialIndex = categories.indexOf(category);
    const [tabIndex, setTabIndex] = useState(initialIndex);

    const [menu] = useMenu();

    const dessert = menu.filter(item => item.category === 'dessert');
    const soup = menu.filter(item => item.category === 'soup');
    const salad = menu.filter(item => item.category === 'salad');
    const pizza = menu.filter(item => item.category === 'pizza');
    const drinks = menu.filter(item => item.category === 'drinks');

    return (
        <div>
        <Helmet>
            <title>fooDie | Order Food</title>
        </Helmet>

            <PageCover img={menuBanner} title="order food" description={"Would you like to try a dish?"} ></PageCover>
             
            <Tabs defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                <TabList>
                    <Tab>Salad</Tab>
                    <Tab>Pizza</Tab>
                    <Tab>Soup</Tab>
                    <Tab>Dessert</Tab>
                    <Tab>Drinks</Tab>
                </TabList>
                <TabPanel>
                    <OrderTab category={salad} />
                </TabPanel>
                <TabPanel>
                    <OrderTab category={pizza} />
                </TabPanel>
                <TabPanel>
                    <OrderTab category={soup} />
                </TabPanel>
                <TabPanel>
                    <OrderTab category={dessert} />
                </TabPanel>
                <TabPanel>
                    <OrderTab category={drinks} />
                </TabPanel>
            </Tabs>
        </div>
    );
};

export default OrderFood;