import { FC, useState } from "react";
import Checkbox from "../Checkbox";
import st from "./AccordionSelect.module.scss";

interface AccordionSelectProps {
    title: string;
    items: { active: boolean; value: string; id: number }[];
    parentId: number;
    onChange: (parentId: number, childId: number) => void;
}

const AccordionSelect: FC<AccordionSelectProps> = ({
    title,
    items,
    parentId,
    onChange,
}) => {
    const [showDropdown, setShowDropdown] = useState(false);

    return (
        <div className={st.root}>
            <div
                className={st.top}
                onClick={() => setShowDropdown(!showDropdown)}
            >
                <svg
                    width="24px"
                    height="24px"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    transform={`${showDropdown ? "rotate(90)" : ""}`}
                >
                    <path d="M9.343 18.657a1 1 0 0 1-.707-1.707l4.95-4.95-4.95-4.95a1 1 0 0 1 1.414-1.414l5.657 5.657a1 1 0 0 1 0 1.414l-5.657 5.657a1 1 0 0 1-.707.293z" />
                </svg>
                <h4>{title}</h4>
            </div>

            <div className={`${st.dropdown} ${showDropdown && st.show}`}>
                {items.map((i) => (
                    <Checkbox
                        key={i.value}
                        title={i.value}
                        active={i.active}
                        parentId={parentId}
                        id={i.id}
                        onChange={onChange}
                    />
                ))}
            </div>
        </div>
    );
};

export default AccordionSelect;
