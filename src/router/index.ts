import { Cart } from "./../pages/Cart/Cart";
import HomePage from "../pages/HomePage/HomePage";
import LandingPage from "../pages/LandingPage/LandingPage";

export const routes = [
    { path: "/", element: LandingPage },
    { path: "/products", element: HomePage },
    { path: "/cart", element: Cart },
];
