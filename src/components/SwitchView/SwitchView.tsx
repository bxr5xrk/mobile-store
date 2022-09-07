import { FC } from "react";
import { useSelector } from "react-redux";
import { viewTypes } from "../../.config";
import {
    selectProductsView,
    setActiveView,
} from "../../store/slices/productsViewSlice";
import { useAppDispatch } from "../../store/store";
import st from "./SwitchView.module.scss";

const SwitchView: FC = () => {
    const { activeView } = useSelector(selectProductsView);
    const dispatch = useAppDispatch();

    const onClickChange = (id: number) => {
        localStorage.setItem("viewType", String(id));
        dispatch(setActiveView(id));
    };

    return (
        <>
            <div className={st.root}>
                {viewTypes.map((i) => (
                    <div
                        key={i.id}
                        onClick={() => onClickChange(i.id)}
                        className={i.id === activeView ? st.active : ""}
                    >
                        {i.item}
                    </div>
                ))}
            </div>
        </>
    );
};

export default SwitchView;
