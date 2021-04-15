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

  export type AuthorObjType = {
    address: string;
    followers: number;
    following: number;
    headImage: string;
    id: string;
    myintro: string;
    name: string;
    nickName: string;
  };

  export type ProductObjType = {
    code: string;
    contractaddress: string;
    copies: number;
    id: string;
    image: string;
    name: string;
    price: number;
    publishDate: number;
    purchaseAgreement: string;
    saleEndTime: string;
    soldAmount: number;
    summary: string;
  };

  export type FirstWorksType = {
    product: ProductObjType[];
    user: AuthorObjType;
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
  export interface OrderType {
    id: string;
    info: string;
    orderId: string;
    charge: number;
  }

  export interface LoginInfoType {
    address: string;
    headImage: string;
    name: string;
    qrCode: string;
    udapAccessToken: string;
    xData: string;
    xSender: string;
    xSignature: string;
  }

  export interface MarketsType {
    id: string;
    height?: number;
    width?: number;
    image: string;
    name: string;
    code: string;
    copies: number;
    contractaddress: string;
    saleEndTime: number;
    price: number;
    increment: number;
    publishDate: number;
  }
}
