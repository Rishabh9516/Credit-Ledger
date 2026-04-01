import { createBrowserRouter } from "react-router";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import AddCredit from "./pages/AddCredit";
import ExcelUpload from "./pages/ExcelUpload";
import CustomerDetail from "./pages/CustomerDetail";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout";

export const router = createBrowserRouter([
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Dashboard },
      { path: "customers", Component: Customers },
      { path: "customer/:id", Component: CustomerDetail },
      { path: "add-credit", Component: AddCredit },
      { path: "upload-excel", Component: ExcelUpload },
      { path: "profile", Component: Profile },
    ],
  },
  {
    path: "*",
    Component: NotFound,
  },
]);