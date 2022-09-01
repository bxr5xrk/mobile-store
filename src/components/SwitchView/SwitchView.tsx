import { FC } from "react";
import st from "./SwitchView.module.scss";

interface SwitchViewProps {
    setActiveView: (i: number) => void;
    activeView: number;
    viewTypes: {
        id: number;
        item: JSX.Element;
    }[];
}

const SwitchView: FC<SwitchViewProps> = ({
    viewTypes,
    setActiveView,
    activeView,
}) => {
    const onClickChange = (id: number) => {
        localStorage.setItem("viewType", String(id));
        setActiveView(id);
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
