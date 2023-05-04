import axios from "axios";

export const userApi = axios.create({
  baseURL: "",
  responseType: "json",
  withCredentials: true,
});

export async function createUser(userDto: any) {
  try {
    const response = await userApi.post("", userDto);

    return response.data;
  } catch (error) {
    throw error;
  }
}
