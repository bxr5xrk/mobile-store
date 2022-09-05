import { FC, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Service } from "../../api/AlloService";
import Products from "../../components/Products/Products";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useAppDispatch } from "../../store/store";
import st from "./ProductsPage.module.scss";

const ProductsPage: FC = () => {
    const dispatch = useAppDispatch();
    const { i18n } = useTranslation();

    useEffect(() => {
        dispatch(Service.fetchProducts({ locale: i18n.language }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [i18n.language]);

    return (
        <main className={st.root}>
            <Sidebar />
            <Products />
        </main>
    );
};

export default ProductsPage;
