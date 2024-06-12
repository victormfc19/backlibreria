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

  async reportXLM(id: number): Promise<any[]> {
    const data = await this.repository.query(`
      select * from reservas r inner join public.libros l on r.idbook = l.id inner join public.clientes c on c.id = r.cliente_id 
      where c.id = $1
      `, [id]);

      return data;
  }
}
