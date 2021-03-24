declare namespace API {
  export type GetMarketsType = {
    startDate: string;
    endDate: string;
    q: string;
  };

  export type InitialOfferingType = {
    orderBy?: string;
    direction?: string;
    sellMethod?: string;
    pageIndex?: number;
    pageSize?: number;
  };
}
