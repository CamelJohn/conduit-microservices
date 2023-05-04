import axios from "axios";

export const userApi = axios.create({
  baseURL: "",
  responseType: "json",
  withCredentials: true,
});

export async function userExists(email: string) {
  const response = await userApi.get(`/${email}`);

  return response.status === 404;
}
