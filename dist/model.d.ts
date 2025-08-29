import { Routes } from "./requests";
export declare class FoxFetch {
    private url;
    private key;
    constructor(url: string, key?: string | null);
    heathCheck(): Promise<boolean>;
    getIndext(): Promise<Routes | null>;
}
export default function createFoxFetchStore(url: string, key?: string | null): FoxFetch;
