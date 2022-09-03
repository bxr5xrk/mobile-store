import React, { FC, KeyboardEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Service } from "../../api/AlloService";
import { useDebounce } from "../../hooks/useDebounce";
import { selectProducts } from "../../store/slices/productsSlice";
import { useAppDispatch } from "../../store/store";
import st from "./SearchModal.module.scss";

interface SearchModalProps {
    setShowModal: (i: boolean) => void;
}

const SearchModal: FC<SearchModalProps> = ({ setShowModal }) => {
    const [value, setValue] = useState("");
    const debouncedValue = useDebounce(value, 500);
    const { devices } = useSelector(selectProducts);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        devices === null && dispatch(Service.fetchProducts());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const results =
        debouncedValue.length > 3
            ? devices &&
              devices.filter(
                  (i) =>
                      i.title
                          .toLowerCase()
                          .includes(value.toLowerCase()) ||
                      i.brand.toLowerCase().includes(value.toLowerCase())
              )
            : null;

    const onClickLink = (slug: string) => {
        navigate(`products/${slug}`);
        setShowModal(false);
    };

    const handleKey = (e: KeyboardEvent<HTMLDivElement>, slug: string) => {
        if (e.key === "Enter") {
            onClickLink(slug);
        }
    };

    return (
        <div className={st.wrapper} onClick={() => setShowModal(false)}>
            <div
                className={st.searchModal}
                onClick={(e) => e.stopPropagation()}
            >
                <div className={st.search}>
                    <svg
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 487.95 487.95"
                    >
                        <path
                            d="M481.8,453l-140-140.1c27.6-33.1,44.2-75.4,44.2-121.6C386,85.9,299.5,0.2,193.1,0.2S0,86,0,191.4s86.5,191.1,192.9,191.1
			c45.2,0,86.8-15.5,119.8-41.4l140.5,140.5c8.2,8.2,20.4,8.2,28.6,0C490,473.4,490,461.2,481.8,453z M41,191.4
			c0-82.8,68.2-150.1,151.9-150.1s151.9,67.3,151.9,150.1s-68.2,150.1-151.9,150.1S41,274.1,41,191.4z"
                        />
                    </svg>
                    <input
                        autoFocus
                        type="text"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                    />
                </div>

                {devices && debouncedValue.length > 3 && (
                    <div className={st.results}>
                        {results !== null && results.length > 1 ? (
                            results.map((i) => (
                                <div
                                    tabIndex={0}
                                    key={i.id}
                                    onClick={() => onClickLink(i.slug)}
                                    onKeyDown={(e) => handleKey(e, i.slug)}
                                >
                                    <p>
                                        {i.brand} {i.fullTitle}
                                    </p>
                                </div>
                            ))
                        ) : (
                            <p className={st.nothing}>
                                No results for "{debouncedValue}"
                            </p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchModal;
