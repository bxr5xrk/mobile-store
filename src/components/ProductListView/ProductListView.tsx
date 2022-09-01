import { FC } from "react";
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
    return (
        <div className={st.root}>
            <div>
                <ItemImageSlider images={images} slug={slug} />
            </div>
            <ItemColors colors={colors} />
        </div>
    );
};

export default ProductListView;
