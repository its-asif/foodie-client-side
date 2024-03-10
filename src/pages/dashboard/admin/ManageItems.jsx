import { FaEdit, FaTrash } from "react-icons/fa";
import useMenu from "../../../hooks/useMenu";
import SectionTitle from "../../shared/SectionTitle";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const ManageItems = () => {
    const [menu, loading, refetch] = useMenu();
    const axiosSecure = useAxiosSecure();


    const handleEditItem = (item) => {  }

    const handleDeleteItem = (item) => { 
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then(async(res) => {
            if (res.isConfirmed) {
                console.log(item._id);
                const res = await axiosSecure.delete(`/menu/${item._id}`);

                if(res.data.deletedCount > 0){
                    refetch();

                    Swal.fire({
                        position: 'center',
                        title: "Deleted!",
                        text: `${item.name} has been deleted.`,
                        icon: "success",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
                
            }
        });
     } 

    return (
        <div>
            <SectionTitle heading='manage all items' subHeading="Hurry up!" ></SectionTitle>

            <h2 className="text-4xl mb-4">Total Menu : {menu.length}</h2>
            
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                    {/* body */}
                    {
                        menu.map( (item, index) => (
                            <tr key={item._id}>
                                <th>{index + 1}</th>
                                <td>
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={item.image} alt="food image" />
                                        </div>
                                    </div>
                                </td>
                                <td>{item.name}</td>
                                <td>{item.price}</td>
                                <td>
                                    <Link to={`/dashboard/editItem/${item._id}`}><button>
                                        <FaEdit className="ml-2"></FaEdit>
                                    </button></Link>
                                </td>
                                <td ><button
                                    onClick={() => handleDeleteItem(item)}
                                    >
                                        <FaTrash className='text-red-600 ml-4'></FaTrash>
                                        </button>
                                </td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageItems;