import {
    createBrowserRouter,
  } from "react-router-dom";
  import '../index.css'
import Main from "../layout/Main";
import Home from "../pages/home/Home";
import Menu from "../pages/menu/Menu";
import OrderFood from "../pages/orderFood/OrderFood";
import Login from "../pages/userAuth/Login";
import Register from "../pages/userAuth/Register";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../layout/Dashboard";
import Cart from "../pages/dashboard/user/Cart";
import AllUsers from "../pages/dashboard/admin/AllUsers";
import AddItems from "../pages/dashboard/admin/AddItems";
import AdminRoutes from "./AdminRoutes";
import ManageItems from "../pages/dashboard/admin/ManageItems";
import UpdateItem from "../pages/dashboard/admin/UpdateItem";
import Payment from "../pages/dashboard/user/Payment";
import PaymentHistory from "../pages/dashboard/user/PaymentHistory";
import UserHome from "../pages/dashboard/user/UserHome";
import AdminHome from "../pages/dashboard/admin/AdminHome";

  export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
            path: "/",
            element: <Home></Home>,
        }, 
        {
            path: "/menu",
            element: <Menu></Menu>,
        },
        {
            path: "/order/:category",
            element: <PrivateRoute><OrderFood></OrderFood></PrivateRoute>,
        },
        {
            path: "/login",
            element: <Login></Login>,
        },
        {
            path: '/register',
            element: <Register></Register>,
        },
        ],
    },
    {
      path: 'dashboard',
      element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
      children: [
        // General user
        {
          path : 'userHome',
          element : <UserHome></UserHome>,
        },
        {
          path: 'cart',
          element: <Cart></Cart>,
        },
        {
          path : 'payment',
          element: <Payment></Payment>,
        },
        {
          path: 'paymentHistory',
          element: <PaymentHistory></PaymentHistory>,
        },

        // admin routes
        {
          path: 'adminHome',
          element: <AdminRoutes><AdminHome></AdminHome></AdminRoutes>,
        },
        {
          path: 'users',
          element: <AdminRoutes><AllUsers></AllUsers></AdminRoutes>,
        },
        {
          path : 'addItems',
          element : <AdminRoutes><AddItems></AddItems></AdminRoutes>,
        },
        {
          path : 'manageItems',
          element : <AdminRoutes><ManageItems></ManageItems></AdminRoutes>,
        },
        {
          path : 'editItem/:id',
          element : <AdminRoutes><UpdateItem></UpdateItem></AdminRoutes>,
          loader : ({params}) => fetch(`http://localhost:5000//menu/${params.id}`)
        },
      ]
    }
  ]);