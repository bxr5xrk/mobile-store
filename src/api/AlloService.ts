import { GET_ALL_DEVICES } from "./../queries/query";
import { GET_SINGLE_DEVICE, QUERY_ALL_DATA } from "../queries/query";
import { CONTENT_API } from "./../.data";
import { IAllData, IDevice } from "./../types/index";
import { createAsyncThunk } from "@reduxjs/toolkit";
import request from "graphql-request";
import { QUERY_SINGLE } from "../queries/query";
import { useQuery } from "@apollo/client";

export class Service {
    static fetchProducts = createAsyncThunk(
        "products/fetchProducts",
        async ({ locale }: { locale: string }) => {
            const variables = {
                locale: [locale],
            };
            const data = await request<IAllData>(
                CONTENT_API,
                QUERY_ALL_DATA,
                variables
            );
            return data;
        }
    );

    static fetchSingleDevice = (slugParams?: string) => {
        const { loading, error, data } = useQuery<{ device: IDevice }>(
            GET_SINGLE_DEVICE,
            {
                variables: { slug: slugParams },
            }
        );

        return { loading, error, data: data?.device };
    };
    static fetchAllDevices = () => {
        const { loading, error, data } = useQuery<{ devices: IDevice[] }>(
            GET_ALL_DEVICES
        );

        return { loading, error, data: data?.devices };
    };

    static fetchProduct = async (
        setProduct: (p: IDevice | "error") => void,
        slug: string
    ) => {
        try {
            const variables = {
                slug,
            };

            const { device } = await request<{ device: IDevice }>(
                CONTENT_API,
                QUERY_SINGLE,
                variables
            );
            console.log(device);

            if (device !== null) {
                return setProduct(device);
            } else {
                return setProduct("error");
            }
        } catch (e) {
            console.error(e);
        }
    };
}
