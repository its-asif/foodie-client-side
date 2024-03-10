import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';
import Swal from 'sweetalert2';
import useCart from '../../hooks/useCart';
import useAdmin from '../../hooks/useAdmin';

const Navbar = () => {
    const {user, logout} = useContext(AuthContext);
    const [cart] = useCart();
    const [isAdmin] = useAdmin();

    const handleLogout = () => {
        logout()
            .then( () => {})
            .catch( error => console.log(error))
    }

    const navOptions = <>
        <li><Link className='hover:bg-warning' to="/">Home</Link></li>
        <li><Link className='hover:bg-warning' to="/menu">Menu</Link></li>
        <li><Link className='hover:bg-warning' to="/order/salad">Order Food</Link></li>
        {
            !user && <li><Link className='hover:bg-warning' to='/register'>Register</Link></li>
        }
        {
            user && isAdmin && <li><Link className='hover:bg-warning' to='/dashboard/adminHome'>Dashboard</Link></li>
        }
        {
            user && !isAdmin && <li><Link className='hover:bg-warning' to='/dashboard/userHome'>Dashboard</Link></li>
        }
        
    </>
    return (
        <div>
            <div className="navbar fixed z-10 bg-black text-warning bg-opacity-60 max-w-screen-xl">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 hover:text-white rounded-box w-52">
                        {navOptions}
                    </ul>
                    </div>
                    <a className="btn btn-ghost normal-case text-xl lg:text-4xl lg:font-bold lg:ml-10  ">fooDie</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navOptions}
                    </ul>
                </div>
                <div className="navbar-end">
                {
                    user && <>
                    <Link to='/dashboard/cart'>
                    <label tabIndex={0} className="btn btn-ghost btn-circle mr-2">
                        <div className="indicator">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                        <span className="badge badge-sm indicator-item">{cart.length}</span>
                        </div>
                    </label>
                    </Link>
                    </>
                }
                
                    {
                        user ? <>
                        <button onClick={handleLogout} className='btn btn-warning'>Log out</button>
                        </> : <>
                            <li className='btn '><Link to='/login'>Login</Link></li>
                        </>
                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;