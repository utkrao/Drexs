export interface IPagination {
    count: number;
    current_page: number;
    has_next : boolean;
    has_previous : boolean
    total_page : number,
    limit: number;
}