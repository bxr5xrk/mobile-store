import { FC, useState } from "react";
// import { useSelector } from "react-redux";
// import { selectFilter } from "../../store/slices/filterSlice";
// import { useAppDispatch } from "../../store/store";
// import { IValue } from "../../types";
// import { changeFilterValue } from "../../utils/changeFilterData";
import st from "./AccordionSelect.module.scss";

interface AccordionSelectProps {
    title: string;
    items: string[];
}

const AccordionSelect: FC<AccordionSelectProps> = ({ title, items }) => {
    // const dispatch = useAppDispatch();
    // const { filterTypes } = useSelector(selectFilter);
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
                >
                    <path d="M9.343 18.657a1 1 0 0 1-.707-1.707l4.95-4.95-4.95-4.95a1 1 0 0 1 1.414-1.414l5.657 5.657a1 1 0 0 1 0 1.414l-5.657 5.657a1 1 0 0 1-.707.293z" />
                </svg>
                <h4>{title}</h4>
            </div>

            <div className={`${st.dropdown} ${showDropdown && st.show}`}>
                {items.map((i) => (
                    <div
                        className={st.item}
                        key={i}
                        // onClick={() =>
                        //     items &&
                        //     dispatch(
                        //         setFilters(
                        //             changeFilterValue(
                        //                 filterTypes,
                        //                 "brands",
                        //                 i.title,
                        //                 !i.isActive
                        //             )
                        //         )
                        //     )
                        // }
                    >
                        {/* <span>{i.isActive === false ? "-" : "+"}</span> */}
                        <p>{i}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AccordionSelect;
