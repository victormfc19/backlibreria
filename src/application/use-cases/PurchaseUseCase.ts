import { PurchaseEntity } from "../../infraestructure/database/entities/PurchaseEntity";
import { BookRepository } from '../../infraestructure/repositories/BookRepository';
import { PurchaseRepository } from "../../infraestructure/repositories/PurchaseRepository";
import { BookUseCase } from "./BookUseCase";
import {UserRepository} from "../../infraestructure/repositories/UserRepository";

export class PurchaseUseCase {
  private purchaseRepository: PurchaseRepository;
  private bookRepository: BookRepository;
  private bookUseCase: BookUseCase;
  private userRepository: UserRepository;

  constructor() {
    this.bookRepository = new BookRepository();
    this.purchaseRepository = new PurchaseRepository();
    this.bookUseCase = new BookUseCase();
    this.userRepository = new UserRepository();
  }

  async getAllPurchases(): Promise<PurchaseEntity[]> {
    return await this.purchaseRepository.findAll();
  }

  async execute(idBook: number, cliente_id: number): Promise<PurchaseEntity> {
    const book = await this.bookRepository.findById(idBook);
    const user = await this.userRepository.findById(cliente_id);
    console.log(`datos del usuario --> ${user} y ${user[0]}`);

    if (!book) {
      throw new Error("Book not found");
    }else if (book[0].stock == 0){
      throw new Error("No hay unidades disponibles");
    }

    if(user[0] == undefined){
      throw new Error("Usuario no existe");
    }

    const purchase = new PurchaseEntity();
    purchase.idBook = idBook 
    purchase.cliente_id = cliente_id;
    purchase.fecha_prestamo = new Date();

    this.bookUseCase.updateStock(book[0]);

    return this.purchaseRepository.create(purchase);
  }
}