import type { User } from "~/models/User";
import UserService from "~/services/UserService";
import { jwtDecode } from "jwt-decode";
import axios, { type AxiosResponse } from "axios";
import type { LoginData } from "~/models/LoginData";
import type { AuthenticatedUser } from "~/models/NewUserResponse";
import type { DecodedToken } from "~/models/DecodedToken";

const API_URL = "http://localhost:3001";
const LOGIN_PATH = "/login";

function decodeToken(token: string): DecodedToken {
  return jwtDecode<DecodedToken>(token);
}

function deleteToken(): void {
  if (process.client) {
    localStorage.removeItem("accessToken");
  }
  if (document?.cookie) {
    document.cookie = "accessToken=;expires=" + new Date(0).toUTCString();
  }
}

function getAccessToken(reqHeaders: Readonly<Record<string, string>>): string {
  if (process.client) {
    return localStorage.getItem("accessToken") || "";
  } else if (process.server) {
    return getCookie(reqHeaders.cookie, "accessToken");
  }

  return "";
}

export function getLoggedInUser(): User | undefined {
  return useState<User | undefined>("loggedInUser").value;
}

export function setLoggedInUser(user: User | undefined): void {
  useState<User | undefined>("loggedInUser").value = user;
}

export async function login(loginData: LoginData): Promise<AxiosResponse<AuthenticatedUser, LoginData>> {
  try {
    const response = await axios.post(`${API_URL}${LOGIN_PATH}`, loginData);

    return response;
  } catch (err: any) {
    return err.response;
  }
}

export function logout(): void {
  setLoggedInUser(undefined);
  deleteToken();
  navigateTo(LOGIN_PATH);
}

function getCookie(cookiesLocation: string, cname: string) {
  const name = cname + "=";
  const ca = cookiesLocation?.split(";");
  for (let i = 0; i < ca?.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }

  return "";
}

export default defineNuxtRouteMiddleware(async (_to, _from) => {
  const reqHeaders = useRequestHeaders();

  if (!getAccessToken(reqHeaders)) {
    logout();

    return navigateTo(LOGIN_PATH);
  } else {
    if (!decodeToken(getAccessToken(reqHeaders))) {
      return navigateTo(LOGIN_PATH);
    }

    const loggedInUserEmail = decodeToken(getAccessToken(reqHeaders) as string).email;
    const user = JSON.parse(JSON.stringify(await UserService.getUserByEmail(loggedInUserEmail))) as User;
    setLoggedInUser(user);
  }
});
