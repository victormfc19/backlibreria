export class User {
  constructor(
    public id: number,
    public name: string,
    public email: string,
    public cellphone: string,
    public address: string,
    public createdAt: Date
  ) {}
}