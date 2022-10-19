import { Cart } from "../pages/Cart/Cart";
import LandingPage from "../pages/LandingPage/LandingPage";
import ProductsPage from "../pages/ProductsPage/ProductsPage";
import ProductPage from "../pages/ProductPage/ProductPage";
import Watchlist from "../pages/Watchlist/Watchlist";
import Page404 from "../pages/Page404/Page404";
import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../layout/Layout";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            { path: "/", element: <LandingPage /> },
            {
                path: "products",
                element: <ProductsPage />,
                children: [{ path: ":slugParams", element: <ProductPage /> }],
            },
            { path: "/cart", element: <Cart /> },
            { path: "/watchlist", element: <Watchlist /> },
        ],
        errorElement: <Page404 />,
    },
]);

export default router;
