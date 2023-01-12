import axios from "axios";
import { IConversation } from "../types/conversation";

export const getUserConversation = async (
  id: string
): Promise<IConversation | undefined> => {
  try {
    const response = await axios.get(
      `${process.env.REACT_API_URL}/conversation/find/${id}`
    );
    return response.data;
  } catch (error: any) {
    console.log(error);
  }
};
