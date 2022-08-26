import { IDevice } from "./../types/index";
import { createAsyncThunk } from "@reduxjs/toolkit";
import request, { gql } from "graphql-request";
import { CONTENT_API } from "../.config";

const QUERY = gql`
    query fetchDevices {
        devices {
            id
            deviceName
            specs {
                deviceColor {
                    color
                    id
                }
                storage {
                    romRam
                    id
                    price
                }
                brand
                battery
                displaySize
                processor
                id
            }
            addingDate
            slug
            images {
                imageHref
                id
            }
        }
    }
`;

export const fetchProducts = createAsyncThunk(
    "products/fetchProducts",
    async () => {
        const { devices } = await request<{ devices: IDevice[] }>(
            CONTENT_API,
            QUERY
        );

        return devices;
    }
);
