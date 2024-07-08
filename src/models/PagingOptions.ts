import type { SortType } from "~/enums/SortType";
import type { OrderType } from "~/enums/OrderType";

export interface PagingOptions {
  _page?: number;
  _limit?: number;
  _sort?: SortType;
  _order?: OrderType;
}
