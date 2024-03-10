
import { FaTrash } from 'react-icons/fa';
import useCart from '../../../hooks/useCart';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { Link } from 'react-router-dom';

const Cart = () => {
    const [cart, refetch] = useCart();
    const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);
    const axiosSecure = useAxiosSecure();

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((res) => {
            if (res.isConfirmed) {
                axiosSecure.delete(`/carts/${id}`)
                .then( result => {
                    console.log(result)
                    if(result.data.deletedCount > 0){
                        refetch();
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                        });
                    }
                })
                .catch( error => {
                    console.log(error);
                })
            }
          });
    };
    return (
        <div>
            <div className='flex justify-evenly'>
                <h1 className="text-4xl">Items : {cart.length}</h1>
                <h1 className="text-4xl">Total Price : {totalPrice}</h1>

                {/* Pay Button */}
                <Link to={'/dashboard/payment'} >
                    <button disabled={cart.length === 0} 
                    className='btn btn-outline' >PAY</button>
                </Link>
            </div>

            <div className="overflow-x-auto">
                <table className="table w-full">
                    {/* head */}
                    <thead>
                    <tr className='text-center'>
                        <th>#</th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th >Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {/* card body */}
                    {
                        cart.map((item, index) => 
                            <tr key={item._id} className='text-center'>
                                <td>
                                    {index+1}
                                </td>
                                <td>
                                <div className="flex items-center gap-3 ">
                                    <div className="avatar mx-auto">
                                    <div className="mask mask-squircle w-12 h-12">
                                        <img src={item.image} alt="Avatar Tailwind CSS Component" />
                                    </div>
                                    </div>
                                </div>
                                </td>
                                <td><div className="font-bold">{item.name}</div></td>
                                <td>{item.price}</td>
                                <td className='text-center'><button
                                onClick={() => handleDelete(item._id)}
                                ><FaTrash className='text-red-600'></FaTrash></button>
                                </td>
                            </tr>
                        )
                    }
                    
                    </tbody>
                </table>
                </div>
        </div>
    );
};

export default Cart;