export interface PaginatedResponse<T> {
    page: number
    limit: number
    total: number
    pages: number
    results: T[]
}

export interface Response<T> {
    success: boolean
    message: string
    data?: T
}

export type Response1<T> = Omit<Response<T>, "data"> & {
    results: T[];
};
