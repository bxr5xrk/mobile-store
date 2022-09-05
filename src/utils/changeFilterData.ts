import {  IFilter } from "./../types/index";
// import { IFilterTypes, IValue } from "../store/slices/filterSlice";

export const changeFilterValue = (
    data: IFilter,
    type: string,
    title: string,
    value: boolean
) => {
    // if (data.brands.values && type === "brands") {
    //     const newObj: IValue[] = [];
    //     data.brands.values.map((i) =>
    //         newObj.push({
    //             title: i.title,
    //             isActive: i.title === title ? value : i.isActive,
    //         })
    //     );
    //     return {
    //         ...data,
    //         brands: {
    //             ...data.brands,
    //             values: [...newObj],
    //         },
    //     };
    // } else {
        return data;
    // }
};

// export const setFilterData = (
//     devices: IDevice[],
//     filterTypes: IFilterTypes
// ) => {
//     const createObj = (value: "brand" | "proc") => {
//         const unique =
//             value === "brand"
//                 ? devices
//                       .map((i) => i.brand)
//                       .filter((v, i, a) => a.indexOf(v) === i)
//                 : value === "proc" &&
//                   devices
//                       .map((i) => i.processor)
//                       .filter((v, i, a) => a.indexOf(v) === i);

//         const obj: { title: string; isActive: boolean }[] = [];
//         unique &&
//             unique.forEach((i) => {
//                 obj.push({ title: i, isActive: false });
//             });
//         return obj;
//     };

//     return {
//         ...filterTypes,
//         brands: {
//             ...filterTypes.brands,
//             values: [...createObj("brand")],
//         },
//         processor: {
//             ...filterTypes.processor,
//             values: [...createObj("proc")],
//         },
//     };
// };
