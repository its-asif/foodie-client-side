import { Link } from "react-router-dom";

const CategoryMenu = ({items, title}) => {
    return (
        <div>

            <div className='grid lg:grid-cols-2 gap-4 mb-5'>
                {
                    items.map( item =>{
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
            
            <div className="text-center">
            <Link to={`/order/${title}`}><button className="btn btn-outline mt-5 border-0 border-b-2 mb-20 border-black">
                            ORDER YOUR FAVOURITE FOOD</button></Link>
            </div>
            
        </div>
    );
};

export default CategoryMenu;