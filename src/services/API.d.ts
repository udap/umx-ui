type WorksType = {
  name: string;
  code: string;
  summary: string;
  publishDate: string;
  copies: string;
  image: string;
};

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
    page?: number;
    size?: number;
  };

  export type FirstWorksType = {
    product: {
      image: string;
      code: string;
      name: string;
      summary: string;
      publishDate: string;
      copies: string;
      soldAmount: string;
      price: string;
    };
    user: {
      headImage: string;
      address: string;
      name: string;
    };
  };
  export type NoticeListType = {
    auth: {
      headImage: string;
      name: string;
      address: string;
      // desTips: string;
      myintro: string;
    };
    works: WorksType[];
  };
}
