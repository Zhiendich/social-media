import axios from "axios";
import { IUser } from "../types/user";

export const getUser = async (id: string): Promise<IUser | undefined> => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL_USER}/${id}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
