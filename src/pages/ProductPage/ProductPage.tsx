import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Service } from "../../api/AlloService";
import { selectProducts } from "../../store/slices/productsSlice";
import { IDevice } from "../../types";

const ProductPage: FC = () => {
    const { devices } = useSelector(selectProducts);
    const [product, setProduct] = useState<IDevice | null | "error">(null);
    const { slugParams } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (devices && slugParams) {
            const device = devices.find((i) => i.slug === slugParams);
            if (device) {
                setProduct(device);
            } else {
                Service.fetchProduct(setProduct, slugParams);
            }
        } else if (slugParams) {
            Service.fetchProduct(setProduct, slugParams);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [slugParams]);

    if (product === "error") {
        return <p>error</p>;
    }

    return (
        <main>
            {product === null ? <p>loading</p> : <p>{product.deviceName}</p>}
            <button onClick={() => navigate("/products")}>back</button>
        </main>
    );
};

export default ProductPage;
