import {Router} from 'express';
import { getPosts, addPost } from '../controllers/posts';

//Importera funktioner från controllers

const router = Router();

router.get("/", getPosts)

router.post("/", addPost)

router.patch("/:id")

router.delete("/:id")

router.patch(":/id/likePost")

//Route för att lämna kommentarer

export default router;