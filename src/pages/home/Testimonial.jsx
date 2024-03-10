import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SectionTitle from "../shared/SectionTitle";
import { Rating } from '@smastrom/react-rating'

import '@smastrom/react-rating/style.css'
import 'swiper/css';
import 'swiper/css/navigation';

const Testimonial = () => {

    const [ review, setReview ] = useState([]);
    const [rating, setRating] = useState(0);

    useEffect(() => {
        fetch('http://localhost:5000//reviews')
        .then(res => res.json())
        .then(data => setReview(data))
    }, [])

    return (
        <div className='mt-20'>
            <SectionTitle 
                heading={'Testimonial'}
                subHeading={'What our customers are saying'}
            />

            <Swiper navigation={true} modules={[Navigation]} className='mySwiper'>
                {
                    review.map((item) => <SwiperSlide key={item._id}>
                        <div className='mb-16 mx-24 text-center px-40'>
                            <Rating 
                                style={{maxWidth : '200px', margin : '10px auto'}}
                                value={item.rating}
                                readOnly
                            />
                            <p>{item.details}</p>
                            <h3 className='text-2xl text-orange-400'>{item.name}</h3>
                        </div>
                    </SwiperSlide> )

                }
            </Swiper>
        </div>
    );
};

export default Testimonial;