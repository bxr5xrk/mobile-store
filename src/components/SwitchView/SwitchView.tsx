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
    return (
        <>
            <div className={st.root}>
                {viewTypes.map((i) => (
                    <div
                        key={i.id}
                        onClick={() => setActiveView(i.id)}
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
