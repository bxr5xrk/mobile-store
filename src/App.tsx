import React, { useState, useEffect } from "react";
import { request } from "graphql-request";
import { useTranslation } from "react-i18next";
import { CONTENT_API } from "./.config";

const App = () => {
    const [products, setProducts] = useState(null);
    const { t, i18n } = useTranslation();

    useEffect(() => {
        const fetchProducts = async () => {
            const { devices } = await request(
                CONTENT_API,
                `
                query fetchDevices {
                    devices {
                      id
                      deviceName
                      addingDate
                      specs {
                        id
                        battery
                        brand
                        displaySize
                        processor
                        id
                        storages {
                          id
                          price
                          romRam
                        }
                      }
                      images {
                        id
                        imageHref
                      }
                    }
                  }
    `
            );

            setProducts(devices);
        };

        fetchProducts();
    }, []);

    console.log(products, i18n.language);

    return (
        <div className="container">
            <div className="title">
                <h1>Blog</h1>
                <button
                    onClick={() =>
                        i18n.changeLanguage(
                            i18n.language === "en" ? "uk" : "en"
                        )
                    }
                >
                    change
                </button>
                <h1>{t("title")}</h1>
            </div>
        </div>
    );
};

export default App;
