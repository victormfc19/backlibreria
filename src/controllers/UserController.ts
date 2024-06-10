import { Request, Response } from "express";
import { UserUseCase } from "../application/use-cases/UserUseCase";

export class UserController {
  private userUseCase: UserUseCase;

  constructor() {
    this.userUseCase = new UserUseCase();
  }

  async getAllUsers(req: Request, res: Response): Promise<void> {
    const users = await this.userUseCase.getAllUsers();
    console.log(users);
    res.json(users);
  }

  async createUser(req: Request, res: Response): Promise<void> {
    const { name, email, cellphone, address } = req.body;
    const user = await this.userUseCase.createUser(name, email, cellphone, address);
    res.json(user);
  }

}
