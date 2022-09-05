import { QUERY_ALL_DATA } from "./../schema/query";
import { CONTENT_API } from "./../.data";
import { IAllData, IDevice } from "./../types/index";
import { createAsyncThunk } from "@reduxjs/toolkit";
import request from "graphql-request";
import { QUERY_SINGLE } from "../schema/query";

export class Service {
    static fetchProducts = createAsyncThunk(
        "products/fetchProducts",
        async () => {
            const data = await request<IAllData>(CONTENT_API, QUERY_ALL_DATA);
            return data;
        }
    );

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
