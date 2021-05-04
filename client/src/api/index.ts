import axios from "axios";

const url = "http://localhost:5000/posts";

// declare module "axios" {
//   export interface AxiosRequestConfig {
//     limit: number;
//     offset: number;
//   }
// }

interface Post {
  _id: object;
  description?: string;
  tags?: string;
  imgURL: string;
}

interface PostOffset {
  limit: number;
  offset: number;
}

export const getPosts = (postOffset: PostOffset) => {
  console.log(postOffset);
  return axios.get(url, {
    params: { limit: postOffset.limit, offset: postOffset.offset },
  });
};
export const uploadPost = (formData: object) => axios.post(url, formData);
