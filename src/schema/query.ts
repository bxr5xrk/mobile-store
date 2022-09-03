import { gql } from "graphql-request";

export const QUERY = gql`
    query fetchDevices {
        devices {
            id
            title
            fullTitle
            slug
            additionDate
            battery
            brand
            deviceColors {
                id
                color {
                    hex
                }
                additionalPrice
            }
            displaySize
            price
            processor
            storage
            images {
                id
                imageHref
            }
        }
    }
`;

export const QUERY_SINGLE = gql`
    query fetchDevice($slug: String!) {
        device(where: { slug: $slug }) {
            id
            title
            fullTitle
            slug
            additionDate
            battery
            brand
            deviceColors {
                id
                color {
                    hex
                }
                additionalPrice
            }
            displaySize
            price
            processor
            storage
            images {
                id
                imageHref
            }
        }
    }
`;
