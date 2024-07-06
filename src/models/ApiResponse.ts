import type { User } from "./User";

export interface ApiResponse {
  first: number;
  prev: number;
  next: number;
  last: number;
  pages: number;
  items: number;
  data: User[];
}
