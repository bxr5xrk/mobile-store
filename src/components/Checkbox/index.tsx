import React, { FC } from "react";
import { useSelector } from "react-redux";
import { selectFilter, setActiveFilters } from "../../store/slices/filterSlice";
import { useAppDispatch } from "../../store/store";
import { changeFilterValue } from "../../utils/changeFilterValue";
import st from "./Checkbox.module.scss";

interface CheckBoxProps {
    title: string;
    checked: boolean;
    id: number;
    styles: string;
}

const Checkbox: FC<CheckBoxProps> = ({ title, checked, id, styles }) => {
    const { activeFilters } = useSelector(selectFilter);
    const dispatch = useAppDispatch();
    return (
        <div
            className={st.status}
            onClick={
                () =>
                    dispatch(
                        setActiveFilters(
                            changeFilterValue(activeFilters, id, title)
                        )
                    )
                // handleClick(changeFilterValue(filterTypes, id, title))
            }
        >
            <input
                type="checkbox"
                className={st.checkbox}
                checked={checked}
                onChange={() => {}}
            />
            {checked && (
                <svg
                    className={st.check}
                    width="24px"
                    height="24px"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#111"
                >
                    <rect width="24" height="24" opacity="0" />
                    <path d="M9.86 18a1 1 0 0 1-.73-.32l-4.86-5.17a1 1 0 1 1 1.46-1.37l4.12 4.39 8.41-9.2a1 1 0 1 1 1.48 1.34l-9.14 10a1 1 0 0 1-.73.33z" />
                </svg>
            )}
            <p style={{ color: `${styles !== "" && styles}` }}>{title}</p>
        </div>
    );
};

export default Checkbox;
