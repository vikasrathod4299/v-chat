import axios, { AxiosResponse } from "axios";
import { MutationFunction, QueryFunction } from "react-query";
import { LocalStorage } from "./utils";
import { Message, RegisterUser, User } from "./types";

const apiClient = axios.create({
  baseURL: process.env.SERVER_URL,
});

apiClient.interceptors.request.use(
  function (config) {
    const user = LocalStorage.get("user");

    config.headers.Authorization = user?.access_token;

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export const signUpApiCall = async (
  data: RegisterUser
): Promise<AxiosResponse<User>> => {
  return await apiClient.post("/auth/register", data);
};

export const searchUsers: QueryFunction<
  AxiosResponse<Array<User>>,
  [string, string]
> = async ({ queryKey }) => {
  const [_, params] = queryKey;
  return await apiClient.get(`/user/searchUser/${params}`);
};

export const getAllchats: QueryFunction<
  AxiosResponse<Array<{ id: number; participants: Array<User> }>>,
  [string]
> = async () => {
  return await apiClient.get("chat");
};

export const getAllMessagess: QueryFunction<
  AxiosResponse<Array<Message>>,
  [string, string]
> = async ({ queryKey }) => {
  const [_, chatId] = queryKey;
  return await apiClient.get(`/message/${chatId}`);
};

export const sendMessages: MutationFunction<
  AxiosResponse<Message>,
  { data: string; chatId: string }
> = async ({ chatId, data }): Promise<AxiosResponse<any, any>> => {
  return await apiClient.post(`/message/send/${chatId}`, { content: data });
};

export const getUserByChatId: QueryFunction<
  AxiosResponse<{ id: number; participants: Array<User> }, any>,
  [string, string]
> = async ({ queryKey }) => {
  const [_, chatId] = queryKey;
  return await apiClient.get(`/user/${chatId}`);
};

export const fetchChatByUserId: QueryFunction<
  AxiosResponse,
  [string, string]
> = async ({ queryKey }) => {
  const [kez, userId] = queryKey;
  return await apiClient.get(`http://192.168.211.136:3001/api/chat/${userId}`);
};
