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
import { setPrice } from "../../store/slices/filterSlice";
import { useAppDispatch } from "../../store/store";
import st from "./MultiRangeSlider.module.scss";

interface MultiRangeSliderProps {
    min: number;
    max: number;
}

const MultiRangeSlider: FC<MultiRangeSliderProps> = ({ min, max }) => {
    const [_minVal, _setMinVal] = useState("0");
    const [_maxVal, _setMaxVal] = useState("0");
    const range = useRef<HTMLDivElement>(null);
    const debMinVal = useDebounce(_minVal, 500);
    const debMaxVal = useDebounce(_maxVal, 500);
    const dispatch = useAppDispatch();
    const [showBtn, setShowBtn] = useState(false);

    const getPercent = useCallback(
        (value: number) => Math.round(((value - min) / (max - min)) * 100),
        [min, max]
    );

    useEffect(() => {
        const minPercent = getPercent(Number(_minVal));
        const maxPercent = getPercent(+_maxVal);
        if (
            range.current &&
            minPercent >= 0 &&
            maxPercent <= 100 &&
            Number(_minVal) <= max
        ) {
            range.current.style.left = `${minPercent}%`;
            range.current.style.width = `${maxPercent - minPercent}%`;
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [_minVal]);

    useEffect(() => {
        const minPercent = getPercent(+_minVal);
        const maxPercent = getPercent(Number(_maxVal));
        if (range.current && minPercent >= 0 && maxPercent <= 100) {
            range.current.style.width = `${maxPercent - minPercent}%`;
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [_maxVal]);

    useEffect(() => {
        _setMinVal(
            Number(_minVal) < min || Number(_minVal) > max
                ? String(min)
                : debMinVal
        );
        _setMaxVal(
            Number(_maxVal) > max || Number(_maxVal) < min
                ? String(max)
                : debMaxVal
        );

        //show popup
        if (Number(_minVal) !== 0) {
            if (Number(_minVal) !== min || Number(_maxVal) !== max) {
                setShowBtn(true);
            }
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debMaxVal, debMinVal]);

    useEffect(() => {
        if (max && min) {
            _setMaxVal(String(max));
            _setMinVal(String(min));
        }
    }, [min, max]);

    const handleClick = () => {
        dispatch(
            setPrice({
                min: Number(_minVal),
                max: Number(_maxVal),
            })
        );
        setShowBtn(false);
    };

    return (
        <div className={st.container}>
            {showBtn && (
                <button onClick={handleClick} className={st.popup}>
                    filter price
                </button>
            )}

            <input
                type="range"
                min={min}
                max={max}
                value={_minVal}
                step={200}
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
                step={200}
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
