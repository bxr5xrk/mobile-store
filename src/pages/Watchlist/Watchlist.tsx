import { FC } from "react";
import { useSelector } from "react-redux";
import { Service } from "../../api/AlloService";
import ProductGridView from "../../components/ProductGridView/ProductGridView";
import { selectWatchlist } from "../../store/slices/watchlistSlice";
import st from "./Watchlist.module.scss";

const Watchlist: FC = () => {
    const { data: devices } = Service.fetchAllDevices();
    const { watchlist } = useSelector(selectWatchlist);
    const watchlistItems =
        devices && watchlist && devices.filter((i) => watchlist.includes(i.id));

    if (!watchlistItems) {
        return <h3>Watchlist is empty :(</h3>;
    }

    return (
        <div className={st.wrapper}>
            <h1>Watchlist</h1>

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
        </div>
    );
};

export default Watchlist;
