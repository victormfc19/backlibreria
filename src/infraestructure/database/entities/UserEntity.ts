import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("clientes")
export class UserEntity {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: "nombre"})
  name!: string;

  @Column()
  email!: string;

  @Column({ name: "telefono"})
  cellphone!: string;
  
  @Column({ name: "direccion"})
  address!: string;
  
  @Column({ type: "timestamp", name: "fecha_registro", default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date;
 
}
