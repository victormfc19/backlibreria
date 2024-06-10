import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("libros")
export class BookEntity {
  
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: "titulo"})
  title!: string;

  @Column({ name: "descripcion"})
  desc!: string;

  @Column()
  stock!: number;

  @Column({ name: "autor"})
  author!: string;

  @Column()
  rutaimagen!: string;
  
  @Column({ type: "timestamp", name: "fecha_creacion", default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date;
 
}