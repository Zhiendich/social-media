import axios from "axios";
import { IPost } from "../types/post";

export const getUsersPosts = async (
  id: string
): Promise<IPost[] | undefined> => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL_POST}/profile/${id}`
    );
    return response.data;
  } catch (error: any) {
    console.log(error);
  }
};
