import { Request, Response } from "express";
import { PurchaseUseCase } from "../application/use-cases/PurchaseUseCase";
import { PurchaseRepository } from "../infraestructure/repositories/PurchaseRepository";
import { create } from "xmlbuilder2";
import path from "path";
import fs from 'fs';
export class PurchaseController {
  private purchaseUseCase: PurchaseUseCase;
  private purchaseRepository: PurchaseRepository;

  constructor() {
    this.purchaseUseCase = new PurchaseUseCase();
    this.purchaseRepository = new PurchaseRepository();
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

  async generateReport(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const dataArray = await this.purchaseRepository.reportXLM(Number(id));

      if (dataArray.length === 0) {
        res.status(404).json({ error: "No se encontraron datos para el ID proporcionado" });
        return;
      }

      const newDataArray = [];

      for (const item of dataArray) {
        const { cliente_id, nombre, email, telefono, titulo, descripcion, fecha_prestamo } = item;
        const fp: string = String(fecha_prestamo)
        const newData = {
          cliente_id,
          nombre,
          email,
          telefono,
          titulo,
          descripcion,
          fecha_prestamo: fp
        };
        newDataArray.push(newData);
      }

      const xml = create({ version: '1.0' })
      .ele('data')
      .ele(newDataArray.map(item => ({
        item
      })))
      .end({ prettyPrint: true });
      
      const filePath = path.join(__dirname, "../xml", "reporte.xml");
      fs.writeFileSync(filePath, xml);
      res.download(filePath, "reporte.xml");

      res.status(200).json(newDataArray);
    } catch (error) {
      res.status(404).json({error: "El libro no existe o se agotaron las unidades disponibles"});
    }
  }

}
