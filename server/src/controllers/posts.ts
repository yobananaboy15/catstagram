import Post from "../models/post";
import { Request, Response, NextFunction } from "express";

type routeHandler = (
  req: Request,
  res: Response,
  next?: NextFunction
) => unknown;

export const getPosts: routeHandler = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {}
};

export const addPost: routeHandler = async (req, res) => {
  const post = req.body;
  console.log(post);
  const newPost = new Post(post);
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json(error);
  }
};
