import { Res } from "./types";
export type Methods = "GET" | "POST" | "UPDATE" | "DELETE";
export type RouteData = {
    path: string;
    name: string;
    description: string;
    methods: Methods[];
};
export type Routes = {
    routes: RouteData[];
};
export declare function reqwest<T>(url: string, options?: RequestInit, key?: string | null): Promise<Res<T>>;
export declare function heathCheck(url: string, key?: string | null): Promise<boolean>;
export declare function getindex(url: string, key?: string | null): Promise<Routes | null>;
