import axios from "axios";
import { OrderType } from "~/enums/OrderType";
import type { ApiResponse } from "~/models/ApiResponse";
import type { PagingOptions } from "~/models/PagingOptions";
import type { User } from "~/models/User";

const API_URL = "http://localhost:3001";

export default {
  async getUsers(pagingOptions: PagingOptions): Promise<ApiResponse> {
    const response = await axios.get(`${API_URL}/users`, {
      params: {
        ...pagingOptions,
        _sort: `${pagingOptions.order === OrderType.DESC ? "-" : ""}${pagingOptions._sort}`,
        order: undefined,
      },
    });

    // await new Promise((resolve) => setTimeout(resolve, 100));

    return response.data as ApiResponse;
  },

  async getUserById(id: string | null): Promise<User> {
    if (!id) {
      throw new Error("User ID szükséges!");
    }

    const response = await axios.get(`${API_URL}/users/${id}`);

    // await new Promise((resolve) => setTimeout(resolve, 200));

    return response.data;
  },

  async createUser(user: Omit<User, "id">): Promise<User> {
    const response = await axios.post(`${API_URL}/users`, user);

    // await new Promise((resolve) => setTimeout(resolve, 200));

    return response.data;
  },

  async updateUser(id: string, user: Partial<User>): Promise<User> {
    const response = await axios.put(`${API_URL}/users/${id}`, user);
    // await new Promise((resolve) => setTimeout(resolve, 200));

    return response.data;
  },

  async deleteUser(id: string): Promise<void> {
    await axios.delete(`${API_URL}/users/${id}`);

    // await new Promise((resolve) => setTimeout(resolve, 200));
  },
};
