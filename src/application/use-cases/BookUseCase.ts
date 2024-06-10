import { BookEntity } from "../../infraestructure/database/entities/BookEntity";
import { BookRepository } from "../../infraestructure/repositories/BookRepository";

export class BookUseCase {
  private bookRepository: BookRepository;

  constructor() {
    this.bookRepository = new BookRepository();
  }

  async getAllBooks(): Promise<BookEntity[]> {
    return await this.bookRepository.findAll();
  }

  async getById(id: number): Promise<BookEntity[]> {
    return await this.bookRepository.findById(id);
  }

  async createBook(title: string, desc: string, stock: number, author: string, rutaimagen: string): Promise<BookEntity> {
    const book = new BookEntity();
    book.title = title;
    book.desc = desc;
    book.stock = stock;
    book.author = author;
    book.rutaimagen = rutaimagen;
    return this.bookRepository.save(book);
  }

  async updateStock(book: BookEntity): Promise<any> {
    let bookToUpdated: BookEntity | any = (await this.bookRepository.findById(book.id)).shift();

    bookToUpdated.stock -= 1;
    this.bookRepository.update(bookToUpdated);
  }
}
