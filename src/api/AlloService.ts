import {
    GET_ALL_DEVICES,
    GET_FILTERS,
    GET_LIMITED_DEVICES,
} from "./../queries/query";
import { GET_SINGLE_DEVICE, QUERY_ALL_DATA } from "../queries/query";
import { CONTENT_API } from "./../.data";
import { IAllData, IDevice, IFilterValue, IGetAllDevicesProps } from "./../types/index";
import { createAsyncThunk } from "@reduxjs/toolkit";
import request from "graphql-request";
import { useQuery } from "@apollo/client";
import { getPages } from "../utils/getPages";
import { limitItems } from "../.config";

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

    static fetchFilters = () => {
        const { loading, error, data } = useQuery<{filterTypes: IFilterValue}>(GET_FILTERS);

        return {
            loading,
            error,
            data: data?.filterTypes,
        };
    };

    static fetchSingleDevice = (slugParams?: string) => {
        const { loading, error, data } = useQuery<{ device: IDevice }>(
            GET_SINGLE_DEVICE,
            {
                variables: { slug: slugParams },
            }
        );

        return { loading, error, data: data?.device };
    };

    static searchDevice = () => {
        const { loading, error, data } = useQuery<{
            devices: Pick<
                IDevice,
                "title" | "fullTitle" | "id" | "brand" | "slug"
            >[];
        }>(GET_ALL_DEVICES);

        return {
            loading,
            error,
            data: data?.devices,
        };
    };

    static fetchAllDevices = ({ page }: { page: number }) => {
        const skip = page * limitItems - limitItems;

        const { loading, error, data } = useQuery<IGetAllDevicesProps>(
            GET_LIMITED_DEVICES,
            { variables: { skip } }
        );

        const totalPages =
            data &&
            getPages(data.devicesConnection.aggregate.count, limitItems);

        return {
            loading,
            error,
            data: data?.devices,
            totalPages,
        };
    };

    // static fetchProduct = async (
    //     setProduct: (p: IDevice | "error") => void,
    //     slug: string
    // ) => {
    //     try {
    //         const variables = {
    //             slug,
    //         };

    //         const { device } = await request<{ device: IDevice }>(
    //             CONTENT_API,
    //             QUERY_SINGLE,
    //             variables
    //         );
    //         console.log(device);

    //         if (device !== null) {
    //             return setProduct(device);
    //         } else {
    //             return setProduct("error");
    //         }
    //     } catch (e) {
    //         console.error(e);
    //     }
    // };
}
