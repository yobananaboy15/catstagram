import axios from "axios";

const url = "http://localhost:5000/posts";

interface Post {
  _id: object;
  description?: string;
  tags?: string;
  imgURL: string;
}

export const getPosts = () => axios.get(url);
export const uploadPost = (formData: object) => axios.post<Post>(url, formData);
