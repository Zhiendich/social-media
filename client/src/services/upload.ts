import axios from "axios";

export const uploadImage = async (data: FormData) => {
  try {
    await axios.post(`http://localhost:5000/api/upload`, data);
  } catch (error: any) {
    console.log(error);
  }
};

// export const getImg = async (src: string | undefined) => {
//   try {
//     const response = await axios.get(`http://localhost:5000/images/${src}`);
//     console.log(response.data);
//     return response.data;
//   } catch (error) {
//     console.log(error);
//   }
// };
