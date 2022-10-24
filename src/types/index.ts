export interface IDeviceImage {
    id: number;
    imageHref: string;
}

export interface IDeviceStorage {
    id: number;
    price: number;
    romRam: string;
}

export interface IDeviceColor {
    id: number;
    color: {
        hex: string;
    };
    additionalPrice: number;
}

export type IBrand = string;

export interface IDevice {
    id: string;
    title: string;
    fullTitle: string;
    additionDate: string;
    images: IDeviceImage[];
    slug: string;
    battery: string;
    brand: IBrand;
    displaySize: number;
    price: number;
    processor: string;
    deviceColors: IDeviceColor[];
    storage: string;
}

export interface IValue {
    value: string;
}

export interface IFilter {
    id: string;
    title: string;
    filterValues: IValue[];
}

export interface IAllData {
    devices: IDevice[];
    filterTypes: IFilter[];
}

export interface IFilterType {
    brands: string[];
    rom: string[];
    ram: string[];
    colors: string[];
}

export type themeType = "light" | "dark";

export interface IPagesCount {
    devicesConnection: {
        aggregate: {
            count: number;
        };
    };
}

export interface IGetAllDevicesProps extends IPagesCount {
    devices: IDevice[];
}
