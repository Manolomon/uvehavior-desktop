import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from "typeorm";
import { Test } from "./test.entity";
import { Groups } from './groups.entity';


@Entity({ name: 'experiment' })
export class Experiment extends BaseEntity {

  @PrimaryGeneratedColumn({ name: "idExperiment" })
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ type: "date", default: () => "date('now')", })
  creationDate: Date

  @Column({ type: "datetime" })
  lastModifiedDate: Date

  @OneToMany(() => Groups, (groups) => groups.idExperiment2)
  groups: Groups[];

  @OneToMany(() => Test, (test) => test.idExperiment2)
  tests: Test[];
}