import { AppDataSource } from "../database/DataSource";
import { PurchaseEntity } from "../database/entities/PurchaseEntity";
import { Repository } from "typeorm";

export class PurchaseRepository {
  private repository: Repository<PurchaseEntity>;

  constructor() {
    this.repository = AppDataSource.getRepository(PurchaseEntity);
  }

  async findAll(): Promise<PurchaseEntity[]> {
    return await this.repository.find();
  }

  async create(purchase: PurchaseEntity): Promise<PurchaseEntity> {
    return this.repository.save(purchase);
  }
}
