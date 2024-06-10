import { AppDataSource } from "../database/DataSource";
import { BookEntity } from "../database/entities/BookEntity";
import { Repository } from "typeorm";

export class BookRepository {
  private repository: Repository<BookEntity>;

  constructor() {
    this.repository = AppDataSource.getRepository(BookEntity);
  }

  async findAll(): Promise<BookEntity[]> {
    return await this.repository.find();
  }

  async findById(id: number): Promise<BookEntity[]> {
    return await this.repository.find({where: {id}});
  }

  async save(user: BookEntity): Promise<BookEntity> {
    return this.repository.save(user);
  }

  async update(book: BookEntity){
    return this.repository.update(book.id, book)
  }
}
