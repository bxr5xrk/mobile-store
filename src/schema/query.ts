import { gql } from "graphql-request";

export const QUERY = gql`
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

export const QUERY_SINGLE = gql`
    query fetchDevice($slug: String!) {
        device(where: { slug: $slug }) {
            id
            slug
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
            images {
                imageHref
                id
            }
        }
    }
`;