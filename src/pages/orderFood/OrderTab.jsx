import React from 'react';
import FoodCard from '../shared/FoodCard';

const OrderTab = ({category}) => {
    return (
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-10'>   
            {
                category.map( item => <FoodCard 
                    key={item._id}
                    item={item} ></FoodCard>)
            }
        </div>
    );
};

export default OrderTab;