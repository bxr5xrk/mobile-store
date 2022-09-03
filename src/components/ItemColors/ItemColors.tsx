import React, { FC } from "react";
import { IDeviceColor } from "../../types";
import st from "./ItemColors.module.scss";

interface ItemColorsProps {
    colors: IDeviceColor[];
}

const ItemColors: FC<ItemColorsProps> = ({ colors }) => {
    return (
        <div className={st.root}>
            {colors.map((i) => (
                <span
                    key={i.id}
                    style={{
                        backgroundColor: i.color.hex,
                        border: `${
                            i.color.hex === "white"
                                ? "1px solid #111"
                                : i.color.hex === "#000000" && "1px solid #fff"
                        } `,
                    }}
                ></span>
            ))}
        </div>
    );
};

export default ItemColors;
