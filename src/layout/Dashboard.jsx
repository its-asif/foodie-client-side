import { NavLink, Outlet } from "react-router-dom";
import { FaAd, FaCalculator, FaEnvelope, FaHome, FaList, FaSearch, FaShoppingCart, FaStar, FaUsers, FaUtensils, FaWallet } from "react-icons/fa";
import useAdmin from "../hooks/useAdmin";

const Dashboard = () => {
    // TODO : check if user is admin
    const [isAdmin] = useAdmin();

    return (
        <div className="flex">
            {/* left side bar */}
            <div className="w-60 min-h-screen bg-[tan]">
                <ul className="menu">
                    {
                        isAdmin?
                        <>
                            <li><NavLink to='/dashboard/adminHome'><FaHome></FaHome> Admin Home</NavLink></li>
                            <li><NavLink to='/dashboard/addItems'><FaUtensils></FaUtensils> Add Items</NavLink></li>
                            <li><NavLink to='/dashboard/manageItems'><FaList></FaList> Manage Items</NavLink></li>
                            <li><NavLink to='/dashboard/bookings'><FaAd></FaAd> Manage Bookings</NavLink></li>
                            <li><NavLink to='/dashboard/users'><FaUsers></FaUsers> All Users</NavLink></li>
                        </>
                        :
                        <>
                            <li><NavLink to='/dashboard/userHome'><FaHome></FaHome> User Home</NavLink></li>
                            <li><NavLink to='/dashboard/reservation'><FaCalculator></FaCalculator> Reservation</NavLink></li>
                            <li><NavLink to='/dashboard/paymentHistory'><FaWallet></FaWallet> Payment History</NavLink></li>
                            <li><NavLink to='/dashboard/cart'><FaShoppingCart></FaShoppingCart> My Cart</NavLink></li>
                            <li><NavLink to='/dashboard/review'><FaStar></FaStar> My Reviews</NavLink></li>
                            <li><NavLink to='/dashboard/bookings'><FaList></FaList> My Booking</NavLink></li>
                        </>
                    }

                    <div className="divider"></div>

                    <li><NavLink to='/'><FaHome></FaHome> Home </NavLink></li>
                    <li><NavLink to='/menu'><FaSearch></FaSearch> Menu </NavLink></li>
                    <li><NavLink to='/order/contact'><FaEnvelope></FaEnvelope> Contact </NavLink></li>
                    
                </ul>
            </div>

                {/* dashboard content */}
                <div className="flex-1 p-10">
                    <Outlet></Outlet>
                </div>
        </div>
    );
};

export default Dashboard;