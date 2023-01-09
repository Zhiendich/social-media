import axios from "axios";
import { IUser } from "../types/user";

export const getUser = async (id: string): Promise<IUser | undefined> => {
  try {
    const response = await axios.get(`http://localhost:5000/api/user/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
