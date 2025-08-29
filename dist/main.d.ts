export type Methods = "GET" | "POST" | "UPDATE" | "DELETE";
export declare function encodeToBase64(data: ArrayBuffer | Uint8Array): string;
export declare function base64ToBuffer(base64: string): Uint8Array;
export type RouteData = {
    path: string;
    name: string;
    description: string;
    methods: Methods[];
};
export type Routes = {
    routes: RouteData[];
};
export declare function heathCheck(url: string): Promise<boolean>;
export declare function getindex(url: string): Promise<Routes | null>;
