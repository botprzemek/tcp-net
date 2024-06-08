// import { gzip, unzip } from "zlib";
//
// export namespace compress {
//     export const from = (data: string): Buffer => {
//         let result: Buffer = Buffer.from("");
//
//         gzip(data, (error: Error | null, buffer: Buffer): void => {
//             if (error) {
//                 console.error("Gzip: ", error);
//                 return;
//             }
//
//             result = buffer;
//         });
//
//         return result;
//     }
//
//     export const to = (data: Buffer): string => {
//         let result: string = "";
//
//         unzip(data, (error: Error | null, buffer: Buffer): void => {
//             if (error) {
//                 console.error("Unzip: ", error);
//                 return;
//             }
//
//             result = buffer.toString();
//         });
//
//         return result;
//     }
// }