import { gql } from "@apollo/client";

export const GET_ALL_DEVICES = gql`
    query getAllDevices ($skip: Int!) {
        devices(first: 3, skip: $skip) {
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
                id
                color {
                    hex
                }
            }
            battery
            brand
            additionDate
        }
        devicesConnection {
            aggregate {
                count
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
