import { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchProducts } from "../../api/AlloService";
import Products from "../../components/Products/Products";
import Sidebar from "../../components/Sidebar/Sidebar";
import { selectProducts } from "../../store/slices/productsSlice";
import { useAppDispatch } from "../../store/store";
import st from "./ProductsPage.module.scss";

const ProductsPage: FC = () => {
    const { devices, status } = useSelector(selectProducts);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchProducts());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    console.log(devices, status);

    return (
        <main className={st.root}>
            <Sidebar />
            <Products />
        </main>
    );
};

export default ProductsPage;
