// export const CONTENT_API =
//     "https://api-eu-central-1.hygraph.com/v2/cl76ltawo0ae601ui48jvavxt/master";

export const limitItems = 3

export const themes = {
    dark: [
        { variable: "--background", value: "#202124" },
        { variable: "--additionalBackground", value: "#494949" },
        { variable: "--text", value: "white" },
    ],
    light: [
        { variable: "--background", value: "#fff" },
        { variable: "--additionalBackground", value: "#f1f1f1" },
        { variable: "--text", value: "black" },
    ],
};

export const sortingTypes = [
    { value: "popularity", title: "by popularity", id: 1 },
    { value: "priceAsc", title: "lowest to highest price", id: 2 },
    { value: "priceDesc", title: " highest to lowest price", id: 3 },
    { value: "time", title: "by date of addition", id: 4 },
];

export const viewTypes = [
    {
        id: 1,
        item: (
            <svg viewBox="0 0 52 52" xmlns="http://www.w3.org/2000/svg">
                <path d="M14,16H2a2,2,0,0,1-2-2V2A2,2,0,0,1,2,0H14a2,2,0,0,1,2,2V14A2,2,0,0,1,14,16ZM4,12h8V4H4Z" />
                <path d="M14,34H2a2,2,0,0,1-2-2V20a2,2,0,0,1,2-2H14a2,2,0,0,1,2,2V32A2,2,0,0,1,14,34ZM4,30h8V22H4Z" />
                <path d="M14,52H2a2,2,0,0,1-2-2V38a2,2,0,0,1,2-2H14a2,2,0,0,1,2,2V50A2,2,0,0,1,14,52ZM4,48h8V40H4Z" />
                <path d="M32,16H20a2,2,0,0,1-2-2V2a2,2,0,0,1,2-2H32a2,2,0,0,1,2,2V14A2,2,0,0,1,32,16ZM22,12h8V4H22Z" />
                <path d="M32,34H20a2,2,0,0,1-2-2V20a2,2,0,0,1,2-2H32a2,2,0,0,1,2,2V32A2,2,0,0,1,32,34ZM22,30h8V22H22Z" />
                <path d="M32,52H20a2,2,0,0,1-2-2V38a2,2,0,0,1,2-2H32a2,2,0,0,1,2,2V50A2,2,0,0,1,32,52ZM22,48h8V40H22Z" />
                <path d="M50,16H38a2,2,0,0,1-2-2V2a2,2,0,0,1,2-2H50a2,2,0,0,1,2,2V14A2,2,0,0,1,50,16ZM40,12h8V4H40Z" />
                <path d="M50,34H38a2,2,0,0,1-2-2V20a2,2,0,0,1,2-2H50a2,2,0,0,1,2,2V32A2,2,0,0,1,50,34ZM40,30h8V22H40Z" />
                <path d="M50,52H38a2,2,0,0,1-2-2V38a2,2,0,0,1,2-2H50a2,2,0,0,1,2,2V50A2,2,0,0,1,50,52ZM40,48h8V40H40Z" />
            </svg>
        ),
    },
    {
        id: 2,
        item: (
            <svg viewBox="0 0 52 52" xmlns="http://www.w3.org/2000/svg">
                <path d="M50,15.52H2a2,2,0,0,1-2-2V2A2,2,0,0,1,2,0H50a2,2,0,0,1,2,2V13.52A2,2,0,0,1,50,15.52Zm-46-4H48V4H4Z" />
                <path d="M50,33.76H2a2,2,0,0,1-2-2V20.24a2,2,0,0,1,2-2H50a2,2,0,0,1,2,2V31.76A2,2,0,0,1,50,33.76Zm-46-4H48V22.24H4Z" />
                <path d="M50,52H2a2,2,0,0,1-2-2V38.48a2,2,0,0,1,2-2H50a2,2,0,0,1,2,2V50A2,2,0,0,1,50,52ZM4,48H48V40.48H4Z" />
            </svg>
        ),
    },
];
