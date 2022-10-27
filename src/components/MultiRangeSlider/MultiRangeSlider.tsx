import { useCallback, useEffect, useState, useRef, FC } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import { cl } from "../../utils";
import st from "./MultiRangeSlider.module.scss";

interface MultiRangeSliderProps {
    min: number;
    max: number;
    onChange: (i: { min: number; max: number }) => void;
}

const MultiRangeSlider: FC<MultiRangeSliderProps> = ({
    min,
    max,
    onChange,
}) => {
    const [minVal, setMinVal] = useState(min);
    const [maxVal, setMaxVal] = useState(max);
    const minDeb = useDebounce(String(minVal), 500);
    const maxDeb = useDebounce(String(maxVal), 500);
    const minValRef = useRef(min);
    const maxValRef = useRef(max);
    const range = useRef<HTMLInputElement>(null);
    const step = 500

    // Convert to percentage
    const getPercent = useCallback(
        (value: number) => Math.round(((value - min) / (max - min)) * 100),
        [min, max]
    );

    // Set width of the range to decrease from the left side
    useEffect(() => {
        const minPercent = getPercent(minVal);
        const maxPercent = getPercent(maxValRef.current);

        if (range.current) {
            range.current.style.left = `${minPercent}%`;
            range.current.style.width = `${maxPercent - minPercent}%`;
        }
    }, [minVal, getPercent]);

    // Set width of the range to decrease from the right side
    useEffect(() => {
        const minPercent = getPercent(minValRef.current);
        const maxPercent = getPercent(maxVal);

        if (range.current) {
            range.current.style.width = `${maxPercent - minPercent}%`;
        }
    }, [maxVal, getPercent]);

    // Get min and max values when their state changes
    useEffect(() => {
        onChange({ min: minVal, max: maxVal });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [minDeb, maxDeb]);

    return (
        <div className={st.container}>
            <input
                type="range"
                min={min}
                max={max}
                value={minVal}
                step={step}
                onChange={(event) => {
                    const value = Math.min(
                        Number(event.target.value),
                        maxVal - 1
                    );
                    setMinVal(value);
                    minValRef.current = value;
                }}
                className={cl([st.thumb, st.thumbLeft])}
                style={{ zIndex: minVal > max - 100 ? "5" : "" }}
            />
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={maxVal}
                onChange={(event) => {
                    const value = Math.max(
                        Number(event.target.value),
                        minVal + 1
                    );
                    setMaxVal(value);
                    maxValRef.current = value;
                }}
                className={cl([st.thumb, st.thumbRight])}
            />

            <div className={st.slider}>
                <div className={st.slider__track} />
                <div ref={range} className={st.slider__range} />
                <div className={st.slider__leftValue}>{minVal}</div>
                <div className={st.slider__rightValue}>{maxVal}</div>
            </div>
        </div>
    );
};

export default MultiRangeSlider;
