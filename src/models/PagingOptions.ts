import type { SortType } from "~/enums/SortType";
import type { OrderType } from "~/enums/OrderType";

export interface PagingOptions {
  _page?: number;
  _per_page?: number;
  _sort?: SortType;
  order?: OrderType;
}
