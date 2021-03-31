import Post from "../models/post";
import {Request, Response, NextFunction} from 'express';

type routeHandler = (
    req: Request,
    res: Response,
    next?: NextFunction
) => unknown

export const getPosts: routeHandler = async (req: Request, res: Response) => {
    try {
        const posts = await Post.find()
        console.log(posts)
        res.status(200).json(posts)
    } catch (error) {
        
    }
}