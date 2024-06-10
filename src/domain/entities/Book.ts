export class Book {
  constructor(
    public id: number,
    public title: string,
    public desc: string,
    public price: number,
    public stock: number,
    public author: string,
    public createdAt: Date
  ) {}
}