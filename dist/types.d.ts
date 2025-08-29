export interface Res<T> {
    data: T | null;
}
export interface ErrorResponse {
    error: string | null;
}
export interface RouteData {
    path: string;
    name: string;
    description: string;
    methods: [string, string][];
}
export interface Routes {
    routes: RouteData[];
}
export interface Allowed {
    messages: string;
    allowed_types: string[];
}
export interface FileMetaData {
    file_name: string;
    file_path: string;
    ext: string;
}
export interface DirectoryResponse {
    directory: String;
    entries: FileMetaData[];
}
export interface FileTypeResponse {
    messages: String;
    entries: DirectoryResponse[];
}
export interface DownloadRespose {
    message: string;
    data: string;
}
