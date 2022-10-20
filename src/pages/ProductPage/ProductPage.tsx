import { FC } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Service } from "../../api/AlloService";

const ProductPage: FC = () => {
    const { slugParams } = useParams();
    const navigate = useNavigate();

    const { loading, error, data } = Service.fetchSingleDevice(slugParams);

    if (loading) return <h1>loading...</h1>;

    if (error) return <h1>error</h1>;

    if (!loading && !data) return <h1>Not found</h1>;

    console.log(data, slugParams);

    return (
        <main>
            <h1>{data && data.fullTitle}</h1>
            <button onClick={() => navigate("/products")}>back</button>
        </main>
    );
};

export default ProductPage;
