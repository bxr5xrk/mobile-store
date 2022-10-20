import { gql } from "@apollo/client";

export const GET_ALL_DEVICES = gql`
    query getDevices {
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

export const GET_SINGLE_DEVICE = gql`
    query getSingleDevice($slug: String!) {
        device(where: { slug: $slug }) {
            slug
            title
            fullTitle
            id
            price
            processor
            storage
            images {
                id
                imageHref
            }
            deviceColors {
                color {
                    hex
                }
            }
            battery
            brand
            additionDate
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

export const QUERY_ALL_DATA = gql`
    query fetchData($locale: [Locale!]!) {
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

        filterTypes(locales: $locale) {
            id
            title
            filterValues {
                value
            }
        }
    }
`;
