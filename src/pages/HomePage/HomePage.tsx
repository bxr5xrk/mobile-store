import request from "graphql-request";
import React, { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { CONTENT_API } from "../../.config";

const HomePage: FC = () => {
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

    useEffect(() => {
        document.cookie = `lang=${i18n.language}`;
    }, [i18n.language]);

    console.log(products, i18n.language);
    return (
        <>
            <h1>{t("title")}</h1>
        </>
    );
};

export default HomePage;
