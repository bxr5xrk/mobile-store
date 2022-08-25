import { Cart } from "./../pages/Cart/Cart";
import LandingPage from "../pages/LandingPage/LandingPage";
import ProductsPage from "../pages/ProductsPage/ProductsPage";
import ProductPage from "../pages/ProductPage/ProductPage";

export const routes = [
    { path: "/", element: LandingPage },
    { path: "/products", element: ProductsPage },
    { path: "/product", element: ProductPage },
    { path: "/cart", element: Cart },
];
