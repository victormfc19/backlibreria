import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("reservas")
export class PurchaseEntity {
  
  @PrimaryGeneratedColumn("uuid")
  id!: number;

  @Column()
  cliente_id!: number;

  @Column()
  fecha_prestamo!: Date;
  
  @Column({ name: "idbook"})
  idBook!: number;

}