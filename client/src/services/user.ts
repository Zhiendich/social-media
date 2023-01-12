import axios from "axios";
import { IUser } from "../types/user";

export const getUser = async (id: string): Promise<IUser | undefined> => {
  try {
    const response = await axios.get(`${process.env.REACT_API_URL}/user/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
