import { Request, Response } from "express";
import { BookUseCase } from "../application/use-cases/BookUseCase";

export class BookController {
  private bookUseCase: BookUseCase;

  constructor() {
    this.bookUseCase = new BookUseCase();
  }

  async getAllBooks(req: Request, res: Response): Promise<void> {
    const books = await this.bookUseCase.getAllBooks();
    console.log(books);
    res.json(books);
  }

  async getById(req: Request, res: Response): Promise<void> {
    const {id} = req.headers;
    const book = await this.bookUseCase.getById(Number(id));
    res.json(book);
  }

  async createBook(req: Request, res: Response): Promise<void> {
    const { title, desc, stock, author, rutaimagen } = req.body;
    const books = await this.bookUseCase.createBook(title, desc, stock, author, rutaimagen);
    res.json(books);
  }

}
