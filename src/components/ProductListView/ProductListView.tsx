import { FC } from "react";
import { useTranslation } from "react-i18next";
import { IDeviceColor, IDeviceImage } from "../../types";
import ItemColors from "../ItemColors/ItemColors";
import ItemImageSlider from "../ItemImageSlider/ItemImageSlider";
import st from "./ProductListView.module.scss";

interface ProductListViewProps {
    deviceName: string;
    images: IDeviceImage[];
    colors: IDeviceColor[];
    price: number;
    slug: string;
}
const ProductListView: FC<ProductListViewProps> = ({
    deviceName,
    images,
    colors,
    price,
    slug,
}) => {
    const { t } = useTranslation();

    return (
        <div className={st.root}>
            <div>
                <div>
                    <ItemImageSlider images={images} slug={slug} />
                </div>
                <ItemColors colors={colors} />
            </div>
            <div>
                <h2>{deviceName}</h2>
            </div>
            <div>
                <h4>{`${t("from")} ${price}₴`}</h4>
            </div>
        </div>
    );
};

export default ProductListView;
