export interface BaseQuery {
  page: number;
  sort: string;
  limit: number;
  filters: Record<string, string | number | Date>;
}
