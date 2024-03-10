import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useCart from "../../hooks/useCart";


const FoodCard = ({item}) => {
    const {_id, name, image, price, recipe} = item;
    const {user} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const axiosSecure = useAxiosSecure();
    const [, refetch]= useCart();

    const handleAddToCart = (food) => {
        if(user && user.email){
            // // TODO : send cart item to the database
            const cartItem = {
                menuId : _id,
                email : user.email,
                name,
                image,
                price,
            }
            axiosSecure.post('/carts', cartItem)
            .then( result => {
                console.log(result.data);   
                if(result.data.insertedId){
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: `${name} Added to Cart`,
                        showConfirmButton: false,
                        timer: 1500
                      });
                    //   refetch cart to update the cart items
                    refetch();
                }
            })
        }
        else{
            Swal.fire({
                title: "Please Login First!",
                text: "You need to login first to add food to cart",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Login",
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
            }).then((result) => {
                if(result.isConfirmed){
                    navigate('/login', {state:{from: location}});
                } 
            } );
        }
    }

    return (
        <div>
            <div className="card h-full w-full bg-base-100 shadow-xl">
                <figure className="h-64"><img src={image} className="w-full h-full" alt="image" /></figure>
                <p className="absolute right-0 mt-4 mr-4 p-2 bg-black text-white">${price}</p>
                <div className="card-body flex flex-col items-center">
                    <h2 className="card-title">{name}</h2>
                    <p>{recipe}</p>
                    <div className="card-actions justify-end">
                    {/* <Link to={`/order`}> */}
                        <button 
                        onClick={() => handleAddToCart(item)}
                        className="btn btn-outline mt-5 bg-slate-100 border-0 border-b-4 border-[#BB8506] text-[#BB8506] hover:text-[#BB8506]">
                    Add to Cart</button>
                    {/* </Link> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;