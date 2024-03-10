import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaTrash, FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";

const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const {data : users = [], refetch} = useQuery({
        queryKey : ['users'],
        queryFn : async () => {
            const res = await axiosSecure.get('/users', {
                headers: {
                    authorization : `Bearer ${localStorage.getItem('access-token')}`
                }
            } );
            return res.data;
        },
    
    })

    const handleDeleteUser = (user) => {
        console.log(user);
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
                axiosSecure.delete(`/users/${user._id}`)
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
    }

    const handleMakeAdmin = (user) => {
        axiosSecure.patch(`/users/admin/${user._id}`)
        .then( res => {
            console.log(res.data);
            if( res.data.modifiedCount > 0){
                refetch();
                Swal.fire({
                    position: 'center',
                    title: "Success!",
                    text: `${user.name} is now an admin.`,
                    icon: "success",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        })
    }

    return (
        <div>
            <div className="flex justify-evenly my-4">
                <h2 className="text-3xl">All Users</h2>
                <h2 className="text-3xl">Total Users : {users.length}</h2>
            </div>

            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Eamil</th>
                        <th>Role</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {/* body */}
                    {
                        users.map( (user, index) => (
                            <tr key={user._id}>
                                <th>{index + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    {
                                        user.role === 'admin' ? 'admin' : <button
                                        onClick={() => handleMakeAdmin(user)}
                                        ><FaUsers ></FaUsers></button>
                                    }
                                </td>
                                <td ><button
                                    onClick={() => handleDeleteUser(user)}
                                    ><FaTrash className='text-red-600'></FaTrash></button>
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

export default AllUsers;