import React, { useEffect, useState } from 'react';
import SectionTitle from '../shared/SectionTitle';
import useMenu from '../../hooks/useMenu';

const PopularMenus = () => {

    const [menu] = useMenu();
    const popular = menu.filter(item => item.category === 'popular');



    return (
        <div>
            <SectionTitle 
                heading={"from our menu"}
                subHeading={"Check it out"}
            />

            <div className='grid lg:grid-cols-2 gap-4 mb-20'>
                {
                    popular.map( item =>{
                        const {_id, name, price, image, recipe} = item;

                        return(
                            <div key={_id} className='flex space-x-4'>
                                <img style={{borderRadius : '0 200px 200px 200px'}} src={image} className="w-[100px]" />
                                <div>
                                    <h3 className='uppercase'>{name}-----------</h3>
                                    <p>{recipe}</p>
                                </div>
                                <p className="text-[#D99904]">${price}</p>
                            </div>
                        )
                    })
                }
            </div>
            
        </div>
    );
};

export default PopularMenus;