import axios from "axios";
import { IPost } from "../types/post";

export const getUsersPosts = async (
  id: string
): Promise<IPost[] | undefined> => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/post/profile/${id}`
    );
    return response.data;
  } catch (error: any) {
    console.log(error);
  }
};
