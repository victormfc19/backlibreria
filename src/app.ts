import "reflect-metadata";
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { UserController } from "./controllers/UserController";
import { BookController } from './controllers/BookController';
import { PurchaseController } from './controllers/PurchaseController';
import { create } from "xmlbuilder2";

dotenv.config();

const app = express()
const port = process.env.PORT || 3001;


app.use(cors())
app.use(express.json());

const userController = new UserController();
const bookController = new BookController();
const purchaseController = new PurchaseController();

app.get("/users", (req: Request, res: Response) => {
    userController.getAllUsers(req, res);
});

app.post("/users", (req: Request, res: Response) => {
    userController.createUser(req, res);
})

app.get("/books", (req: Request, res: Response) => {
    bookController.getAllBooks(req, res);
})

app.get("/book", (req: Request, res: Response) => {
    bookController.getById(req, res);
})

app.post("/books", (req: Request, res: Response) => {
    bookController.createBook(req, res);
})

app.post("/purchase", (req: Request, res: Response) => {
    purchaseController.execute(req, res);
})

app.get("/purchase", (req: Request, res: Response) => {
    purchaseController.getAllPurchases(req, res);
})

app.get("/purchasexml/:id", (req: Request, res: Response) => {
    console.log(req.params);
    
    purchaseController.generateReport(req, res);
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))



