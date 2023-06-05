export interface News{
  successful: boolean;
  data: Datum[];
}

export interface Datum {
  NewsId: number;
  NameNews: string;
  Detail: string;
  Status: number;
  UpdatedDate: string;
  ButtonView: number;
  ButtonEdit: number;
  ButtonDelete: number;
}