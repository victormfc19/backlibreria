import { AppDataSource } from "../database/DataSource";
import { UserEntity } from "../database/entities/UserEntity";
import { Repository } from "typeorm";
import {BookEntity} from "../database/entities/BookEntity";

export class UserRepository {
  private repository: Repository<UserEntity>;

  constructor() {
    this.repository = AppDataSource.getRepository(UserEntity);
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.repository.find();
  }

  async save(user: UserEntity): Promise<UserEntity> {
    return this.repository.save(user);
  }

  async findById(id: number): Promise<UserEntity[]> {
    return await this.repository.find({where: {id}});
  }
}
