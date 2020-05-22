import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, PrimaryColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Groups } from './groups.entity';
import { Evaluation } from './evaluation.entity';

@Entity({ name: 'subject' })
export class Subject extends BaseEntity {

  @PrimaryGeneratedColumn({ name: "idSubject" })
  id: number;

  @PrimaryColumn()
  idGroup: number;

  @Column()
  name: string;

  @ManyToOne(() => Groups, (groups) => groups.subjects, { onDelete: "CASCADE" })

  @JoinColumn([{ name: "idGroup", referencedColumnName: "idGroup" }])
  idGroup2: Groups;

  @OneToMany(() => Evaluation, (evaluation) => evaluation.idSubject2)
  evaluations: Evaluation[];
}