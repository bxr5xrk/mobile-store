import { gql } from "graphql-request";

export const QUERY = gql`
    query fetchDevices {
        devices {
            slug
            deviceName
            deviceColor {
                color
                id
                additionalPrice
            }
            storages {
                romRam
                id
                price
            }
            brand
            battery
            displaySize
            processor
            id
            addingDate
            images {
                imageHref
                id
            }
        }
    }
`;

export const QUERY_SINGLE = gql`
    query fetchDevice($slug: String!) {
        device(where: { slug: $slug }) {
            slug
            deviceName
            deviceColor {
                color
                id
                additionalPrice
            }
            storages {
                romRam
                id
                price
            }
            brand
            battery
            displaySize
            processor
            id
            addingDate
            images {
                imageHref
                id
            }
        }
    }
`;
