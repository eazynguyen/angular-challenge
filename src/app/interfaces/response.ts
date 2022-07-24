export interface IResponse {
  total: number;
  skip: string;
  limit: number;
}

export interface IPagination{
  totalResult: number;
  totalPage: number;
  currentPage: number;
}
