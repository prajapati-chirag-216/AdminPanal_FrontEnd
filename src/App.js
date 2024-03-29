import Dashboard from "./pages/Deshboard/Deshboard";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";
import Layout from "./components/Dekstop/UI/Layout";
import SignIn from "./pages/SignIn";
import { action as signinAction } from "./components/Dekstop/Form/SigninForm";
import Wrapper from "./components/Dekstop/UI/Wrapper";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import { action as resetPasswordAction } from "./components/Dekstop/Form/ResetPasswordForm";
import { action as forgotPasswordAction } from "./components/Dekstop/Form/ForgotPasswordForm";
import PrivateRoutes from "./routes/PrivateRoutes";
import ProtectedRoutes, {
  loader as profileLoader,
} from "./routes/ProtectedRoutes";
import Error from "./pages/Error/Error";
import Success from "./pages/Success/Success";
import AddProduct from "./components/Product/AddProduct";
import { loader as CategoryLoader } from "./components/Product/Form/AddProductForm";
import { loader as DisplayCatagoryLoader } from "./components/Dekstop/Display/Form/AddDisplayForm";
import "./App.css";
import AddCategory from "./components/Category/AddCategory";
import Orders from "./components/Orders/Orders";
import UsersPage from "./components/Users/user";
import ProductReviews, {
  loader as ReviewsLoader,
} from "./components/Product/ProductReviews/productreviews";
import AdminsPage from "./components/Admins/Admin";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Wrapper />} errorElement={<Error />}>
      <Route path="/login" element={<SignIn />} action={signinAction} />
      <Route
        path="/forgotPassword"
        element={<ForgotPassword />}
        action={forgotPasswordAction}
      />
      <Route
        path="/resetPassword/:id"
        element={<ResetPassword />}
        action={resetPasswordAction}
      />
      <Route
        element={
          <PrivateRoutes message="Access denied! You don't have permissions for this page." />
        }
      >
        <Route path="/success" element={<Success />} />
      </Route>
      <Route element={<Layout />}>
        <Route
          element={<ProtectedRoutes destination="/login" />}
          loader={profileLoader}
        >
          <Route index element={<Navigate to="/admin/dashboard" />} />
          <Route
            path="/admin/dashboard"
            element={<Dashboard />}
            loader={DisplayCatagoryLoader}
          />
          <Route
            path="/admin/product"
            element={<AddProduct />}
            loader={CategoryLoader}
          />
          <Route
            path="/admin/category"
            element={<AddCategory />}
            loader={CategoryLoader}
          />
          <Route path="/admin/orders" element={<Orders />} />
          <Route path="/admin/admins" element={<AdminsPage />} />
        </Route>
        <Route path="/admin/customers" element={<UsersPage />} />
        <Route
          path="/admin/reviews/:id"
          element={<ProductReviews />}
          loader={ReviewsLoader}
        />
      </Route>
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
