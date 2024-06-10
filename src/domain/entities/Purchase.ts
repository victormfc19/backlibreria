export class Purchase {
  constructor(
  public id: number,
  public bookId: number,
  public cliente_id: number,
  public fecha_prestamo: Date,
  ){}
}