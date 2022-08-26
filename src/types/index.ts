interface IDeviceImage {
    id: number;
    imageHref: string;
}

interface IDeviceStorage {
    id: number;
    price: number;
    romRam: string;
}

interface IDeviceColor {
    id: number;
    color: string;
}

interface IDeviceSpecs {
    id: number;
    battery: string;
    brand: string;
    displaySize: number;
    processor: string;
    deviceColor: IDeviceColor[];
    storage: IDeviceStorage[];
}

export interface IDevice {
    id: number;
    deviceName: string;
    addingDate: string;
    images: IDeviceImage[];
    specs: IDeviceSpecs;
}
