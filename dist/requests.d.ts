import { Allowed, Res, Settings } from "./types";
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
export declare function getSettings(url: string, key?: string | null): Promise<Settings | null>;
export declare function getAllowedList(url: string, key?: string | null): Promise<Allowed | null>;
