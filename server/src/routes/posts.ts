import express, {Request, Response} from 'express';

//Importera funktioner från controllers

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
    //Hämta alla poster
})

router.post("/")

router.patch("/:id")

router.delete("/:id")

router.patch(":/id/likePost")

//Route för att lämna kommentarer

export default router;