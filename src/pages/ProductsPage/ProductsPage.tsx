import request from "graphql-request";
import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { CONTENT_API } from "../../.config";
import Products from "../../components/Products/Products";
import Sidebar from "../../components/Sidebar/Sidebar";

const ProductsPage: FC = () => {
    const [products, setProducts] = useState(null);
    const { i18n } = useTranslation();

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
        <main>
            <Sidebar />
            <Products />
        </main>
    );
};

export default ProductsPage;
