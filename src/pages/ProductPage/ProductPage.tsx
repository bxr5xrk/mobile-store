import { useQuery } from "@apollo/client";
import { FC } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GET_SINGLE_DEVICE } from "../../queries/query";
import { IDevice } from "../../types";

const FetchSingleDevice = (slugParams?: string) => {
    const { loading, error, data } = useQuery<{ device: IDevice }>(
        GET_SINGLE_DEVICE,
        {
            variables: { slug: slugParams },
        }
    );

    return { loading, error, data: data?.device };
};

const ProductPage: FC = () => {
    const { slugParams } = useParams();
    const navigate = useNavigate();

    const { loading, error, data } = FetchSingleDevice(slugParams);

    if (loading) console.log("loading");

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
