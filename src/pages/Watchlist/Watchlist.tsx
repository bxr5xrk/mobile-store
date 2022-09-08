import React, { FC } from "react";
import { useSelector } from "react-redux";
import ProductGridView from "../../components/ProductGridView/ProductGridView";
import { selectProducts } from "../../store/slices/productsSlice";
import { selectWatchlist } from "../../store/slices/watchlistSlice";
import st from "./Watchlist.module.scss";

const Watchlist: FC = () => {
    const { devices } = useSelector(selectProducts);
    const { watchlist } = useSelector(selectWatchlist);
    const watchlistItems =
        devices && watchlist && devices.filter((i) => watchlist.includes(i.id));

    if (!watchlistItems) {
        return <></>
    }

    return (
        <div className={st.wrapper}>
            <h1>Watchlist</h1>

            {watchlistItems.length ? (
                <div className={st.root}>
                    {watchlistItems.map((device) => (
                        <ProductGridView
                            key={device.id}
                            fullTitle={device.fullTitle}
                            images={device.images}
                            colors={device.deviceColors}
                            price={String(device.price)}
                            slug={device.slug}
                            id={device.id}
                        />
                    ))}
                </div>
            ) : (
                <h3>Watchlist is empty :(</h3>
            )}
        </div>
    );
};

export default Watchlist;
