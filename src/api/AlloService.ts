import {
    GET_ALL_DEVICES,
    GET_FILTERS,
    GET_LIMITED_DEVICES,
} from "./../queries/query";
import { GET_SINGLE_DEVICE } from "../queries/query";
import {
    IDevice,
    IFilterValue,
    IGetAllDevicesProps,
} from "./../types/index";
import { useQuery } from "@apollo/client";

export class Service {

    static fetchFilters = () => {
        const { loading, error, data } = useQuery<{
            filterTypes: IFilterValue;
        }>(GET_FILTERS);

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

    static fetchAllDevices = (lang?: string) => {
        const locale = lang ? lang : "en";

        const { loading, error, data, refetch } = useQuery<IGetAllDevicesProps>(
            GET_LIMITED_DEVICES,
            { variables: { locale: [locale] } }
        );

        return {
            loading,
            error,
            data: data?.devices,
            refetch,
        };
    };
}
