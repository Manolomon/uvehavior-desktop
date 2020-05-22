import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, PrimaryColumn } from "typeorm";

@Entity({ name: 'annotation' })
export class Annotation extends BaseEntity {

  @PrimaryGeneratedColumn({ name: "idAnnotation" })
  id: number;

  @PrimaryColumn()
  idBehaviorEvaluation: number;

  @Column("real")
  timeLog: number;
}