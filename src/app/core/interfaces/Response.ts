export interface Response {
    status: string;
    message: string;
}

export interface ListResponse<T> {
    count?: number;
    data: T[];
    success: boolean;
    message?: string;
}

export interface DetailResponse{
    data: any;
    success: boolean;
    message?: string;
}
