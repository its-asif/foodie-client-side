import SectionTitle from "../shared/SectionTitle";
import featuredImg from "../../assets/home/featured.jpg";
import './Featured.css';

const Featured = () => {
    return (
                                                    // Parallax effect
        <div className="featuredImg text-white  mt-10 bg-fixed">
            <div className="bg-black bg-opacity-50 pt-6">
                <SectionTitle
                    heading={"from our menu"}
                    subHeading={"Check it out"}
                />


                <div className="flex justify-center items-center pt-10 pb-20 px-36">
                    <div>
                        <img src={featuredImg}  />
                    </div>
                    <div className="md:ml-10">
                        <p>Nov 11, 2023</p>
                        <p className="uppercase">where can i get some?</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis odio assumenda officiis praesentium eligendi dicta voluptas cupiditate numquam beatae! Nemo, dolorem! Officia assumenda accusamus obcaecati, doloremque vero officiis quas. Harum perferendis nemo ad, voluptatibus ut voluptatum maiores quo aspernatur sequi numquam, nobis ullam id quam cum, reprehenderit sit pariatur voluptas.</p>
                        <button className="btn btn-outline mt-5 border-0 border-b-2 text-white  border-black">
                            Order Now</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Featured;