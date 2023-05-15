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
import ProtectedRoutes from "./routes/ProtectedRoutes";
import Error from "./pages/Error/Error";
import Success from "./pages/Success/Success";
import AddProduct from "./components/Product/AddProduct";
import { loader as CategoryLoader } from "./components/Product/Form/AddProductForm";
import "./App.css";
import AddCategory from "./components/Category/AddCategory";

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
        <Route element={<ProtectedRoutes destination="/login" />}>
          <Route index element={<Navigate to="/admin" />} />
          <Route path="/admin" element={<Dashboard />} />
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
        </Route>
      </Route>
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
