import {
    ChangeEvent,
    FC,
    memo,
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";
import { useDebounce } from "../../hooks/useDebounce";
import st from "./MultiRangeSlider.module.scss";

interface MultiRangeSliderProps {
    min: number;
    max: number;
    setMinVal: (i: number) => void;
    setMaxVal: (i: number) => void;
}

const MultiRangeSlider: FC<MultiRangeSliderProps> = ({
    min,
    max,
    setMaxVal,
    setMinVal,
}) => {
    const [_minVal, _setMinVal] = useState("0");
    const [_maxVal, _setMaxVal] = useState("0");
    const minValRef = useRef<HTMLInputElement>(null);
    const maxValRef = useRef<HTMLInputElement>(null);
    const range = useRef<HTMLDivElement>(null);
    const debMinVal = useDebounce(_minVal, 500);
    const debMaxVal = useDebounce(_maxVal, 500);

    const getPercent = useCallback(
        (value: number) => Math.round(((value - min) / (max - min)) * 100),
        [min, max]
    );

    useEffect(() => {
        if (maxValRef.current) {
            const minPercent = getPercent(Number(_minVal));
            const maxPercent = getPercent(+maxValRef.current.value);
            if (
                range.current &&
                minPercent >= 0 &&
                maxPercent <= 100 &&
                Number(_minVal) <= max
            ) {
                range.current.style.left = `${minPercent}%`;
                range.current.style.width = `${maxPercent - minPercent}%`;
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [_minVal]);

    useEffect(() => {
        if (minValRef.current) {
            const minPercent = getPercent(+minValRef.current.value);
            const maxPercent = getPercent(Number(_maxVal));

            if (range.current && minPercent >= 0 && maxPercent <= 100) {
                range.current.style.width = `${maxPercent - minPercent}%`;
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [_maxVal]);

    useEffect(() => {
        setMinVal(
            Number(_minVal) < min || Number(_minVal) > max
                ? min
                : Number(debMinVal)
        );
        setMaxVal(
            Number(_maxVal) > max || Number(_maxVal) < min
                ? max
                : Number(debMaxVal)
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debMaxVal, debMinVal]);

    useEffect(() => {
        if (max && min) {
            _setMaxVal(String(max));
            _setMinVal(String(min));
        }
    }, [min, max]);

    return (
        <div className={st.container}>
            <input
                type="range"
                min={min}
                max={max}
                value={_minVal}
                ref={minValRef}
                step={100}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    const value = Math.min(
                        +event.target.value,
                        Number(_maxVal) - 1
                    );
                    _setMinVal(String(value));
                    event.target.value = value.toString();
                }}
                className={`${st.thumb} ${st.thumb__zindex_3} ${
                    Number(_minVal) > max - 100 && st.thumb__zindex_5
                }  {
                 
                `}
            />
            <input
                type="range"
                min={min}
                max={max}
                value={_maxVal}
                ref={maxValRef}
                step={100}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    const value = Math.max(
                        +event.target.value,
                        Number(_minVal) + 1
                    );
                    _setMaxVal(String(value));
                    event.target.value = value.toString();
                }}
                className={`${st.thumb} ${st.thumb__zindex_4}`}
            />

            <div className={st.slider}>
                <div className={st.slider__track}></div>
                <div ref={range} className={st.slider__range}></div>
                <input
                    className={st.slider__left_value}
                    type="number"
                    value={_minVal}
                    onChange={(e) => _setMinVal(e.target.value)}
                />
                <input
                    className={st.slider__right_value}
                    type="number"
                    value={_maxVal}
                    onChange={(e) => _setMaxVal(e.target.value)}
                />
            </div>
        </div>
    );
};

export default memo(MultiRangeSlider);
