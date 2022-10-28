import { FC } from "react";
import { viewTypes } from "../../.config";
import st from "./SwitchView.module.scss";

interface SwitchViewProps {
    activeView: number;
    setActiveView: (i: number) => void;
}

const SwitchView: FC<SwitchViewProps> = ({ activeView, setActiveView }) => {
    const onClickChange = (id: number) => {
        setActiveView(id);
        localStorage.setItem("viewType", String(id));
    };

    return (
        <>
            <div className={st.root}>
                {viewTypes.map((i) =>
                    i.id !== activeView ? (
                        <div
                            key={i.id}
                            onClick={() => onClickChange(i.id)}
                            className={st.active}
                            title="change items view"
                        >
                            {i.item}
                        </div>
                    ) : null
                )}
            </div>
        </>
    );
};

export default SwitchView;
