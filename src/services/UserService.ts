import axios from "axios";
import type { User } from "~/models/User";

const API_URL = "http://localhost:3001";

export default {
  async getUsers(): Promise<User[]> {
    try {
      const response = await axios.get(`${API_URL}/users`);

      return response.data;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  },

  async getUserById(id: string | null): Promise<User> {
    if (!id) {
      throw new Error("User ID szükséges!");
    }

    const response = await axios.get(`${API_URL}/users/${id}`);

    return response.data;
  },

  async createUser(user: Omit<User, "id">): Promise<User> {
    try {
      const response = await axios.post(`${API_URL}/users`, user);

      return response.data;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  },

  async updateUser(id: string, user: Partial<User>): Promise<User> {
    try {
      const response = await axios.put(`${API_URL}/users/${id}`, user);

      return response.data;
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  },

  async deleteUser(id: string): Promise<void> {
    try {
      await axios.delete(`${API_URL}/users/${id}`);
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  },
};
