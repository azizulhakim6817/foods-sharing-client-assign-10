import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import Home from "./../pages/Home/Home";
import AddFood from "./../pages/AddFood/AddFood";
import MangeMyFood from "./../pages/MangeMyFood/MangeMyFood";
import MyFoodReques from "./../pages/MyFoodReques/MyFoodReques";
import Login from "./../pages/Login/Login";
import Register from "../pages/Register/Register";
import FoodDetails from "../pages/FoodDetails/FoodDetails";
import PrivateRoutes from "./PrivateRoutes";
import Available from "./../pages/Available/Available";
import ErrorPage from "../pages/errorPage/ErrorPage ";
import NotFound from "../pages/errorPage/NotFoundPage";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/add-food",
        Component: AddFood,
      },
      {
        path: "/available-foods",
        Component: Available,
      },
      {
        path: "/food-details/:id",
        element: (
          <PrivateRoutes>
            <FoodDetails />
          </PrivateRoutes>
        ),
      },
      {
        path: "/manage-my-foods",
        element: (
          <PrivateRoutes>
            <MangeMyFood />
          </PrivateRoutes>
        ),
      },
      {
        path: "/my-food-requests",
        element: (
          <PrivateRoutes>
            <MyFoodReques />
          </PrivateRoutes>
        ),
      },

      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/Login",
        Component: Login,
      },
      {
        path: "*",
        Component: NotFound,
      },
    ],
  },
]);

export default router;
