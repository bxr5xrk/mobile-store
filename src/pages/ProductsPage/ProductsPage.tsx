import { FC } from "react";
import Products from "../../components/Products/Products";
import Sidebar from "../../components/Sidebar/Sidebar";
import st from "./ProductsPage.module.scss";

const ProductsPage: FC = () => {
    return (
        <main className={st.root}>
            <Sidebar />
            <Products />
        </main>
    );
};

export default ProductsPage;
