import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home";
import Login from "../components/Login";
import Register from "../components/Register";
import CartPage from "../pages/home/books/CartPage";
import CheckoutPage from "../pages/home/books/CheckoutPage";
import SingleBook from "../pages/home/books/SingleBook";
import ErrorBoundary from "../components/ErrorBoundary";
import PrivateRoute from "./PrivateRoute";
import OrderPage from "../pages/home/books/OrderPage";
import AdminRoute from "./AdminRoute";
import AdminLogin from "../components/AdminLogin";
import DashboardLayout from "../pages/dashboard/DashboardLayout";
import Dashboard from "../pages/dashboard/Dashboard";
import ManageBooks from "../pages/dashboard/manageBooks/ManageBooks";
import AddBook from "../pages/dashboard/addBook/AddBook";
import UpdateBook from "../pages/dashboard/EditBook/UpdateBook";
import Book from "../pages/home/books/Book";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorBoundary />, // ตัวแจ้ง ERROR ในหน้าเว็บ
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/orders",
        element: <PrivateRoute><OrderPage/></PrivateRoute>,
      },
      {
        path: "/about",
        element: <div>About</div>,
      },
      {
        path: "/login",
        element: <Login/>,
      },
      {
        path: "/register",
        element: <Register/>,
      },
      {
        path: "/cart",
        element: <CartPage/>,
      },
      {
        path: "/checkout",
        element: <PrivateRoute><CheckoutPage/></PrivateRoute>,
      },
      {
        path: "/book/:id",
        element: <SingleBook/>,
        errorElement: <ErrorBoundary />, // ตัวแจ้ง ERROR ในหน้าเว็บ
      },
      {
        path: "/book",
        element: <Book/>,
        errorElement: <ErrorBoundary />, // ตัวแจ้ง ERROR ในหน้าเว็บ
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLogin/>
  },
  {
    path: "/dashboard",
    element: <AdminRoute>
      <DashboardLayout/>
    </AdminRoute>,
    children: [
      {
        path: "",
        element: <AdminRoute>
          <Dashboard/>
        </AdminRoute>
      },
      {
        path: "add-new-book",
        element: <AdminRoute>
          <AddBook/>
        </AdminRoute>
      },
      {
        path: "edit-book/:id",
        element: <AdminRoute>
          <UpdateBook/>
        </AdminRoute>
      },
      {
        path: "manage-books",
        element: <AdminRoute>
          <ManageBooks/>
        </AdminRoute>
      }
    ]
  }
]);

export default router;