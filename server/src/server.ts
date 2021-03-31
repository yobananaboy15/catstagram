import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv'

//Importera mina routes.
import postsRouter from "./routes/posts"

const app = express();
dotenv.config();

//Sätt upp all middleware. Kan behöva lägga till options för att öka storleken på filerna.

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

//app.use(mina routes)
app.use("/posts", postsRouter)

const PORT = process.env.PORT || 5000;

mongoose.connect(`${process.env.CONNECTION_URL}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
})
.then(() =>
    app.listen(PORT, () => console.log(`Server Running on port: ${PORT}`))
  )
  .catch((error) => console.log(error.message));