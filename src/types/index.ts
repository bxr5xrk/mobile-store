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
    color: string;
    additionalPrice: number;
}

export interface IDevice {
    id: number;
    deviceName: string;
    addingDate: string;
    images: IDeviceImage[];
    slug: string;
    battery: string;
    brand: string;
    displaySize: number;
    processor: string;
    deviceColor: IDeviceColor[];
    storages: IDeviceStorage[];
}
