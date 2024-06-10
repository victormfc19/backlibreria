import { Request, Response } from "express";
import { PurchaseUseCase } from "../application/use-cases/PurchaseUseCase";

export class PurchaseController {
  private purchaseUseCase: PurchaseUseCase;

  constructor() {
    this.purchaseUseCase = new PurchaseUseCase();
  }

  async getAllPurchases(req: Request, res: Response): Promise<void> {
    const purchases = await this.purchaseUseCase.getAllPurchases();
    res.json(purchases);
  }

  async execute(req: Request, res: Response): Promise<void> {
    try {
      const { idBook, cliente_id } = req.body;
      const purchase = await this.purchaseUseCase.execute(idBook, cliente_id);
      res.json(purchase);
    } catch (error) {
      res.status(404).json({error: "El libro no existe o se agotaron las unidades disponibles"});
    }
  }

}
