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
                        backgroundColor: i.color,
                        border: `${
                            i.color === "white"
                                ? "1px solid #111"
                                : i.color === "black"
                                ? "1px solid #fff"
                                : "1px solid transparent"
                        } `,
                    }}
                ></span>
            ))}
        </div>
    );
};

export default ItemColors;
