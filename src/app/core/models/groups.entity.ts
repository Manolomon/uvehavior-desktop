import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, PrimaryColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Experiment } from './experiment.entity';
import { Subject } from './subject.entity';

@Entity({ name: 'groups' })
export class Groups extends BaseEntity {

  @PrimaryGeneratedColumn({ name: "idGroup" })
  id: number;

  @PrimaryColumn()
  idExperiment: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToOne(() => Experiment, (experiment) => experiment.groups, {
    onDelete: "CASCADE",
  })

  @JoinColumn([{ name: "idExperiment", referencedColumnName: "idExperiment" }])
  idExperiment2: Experiment;

  @OneToMany(() => Subject, (subject) => subject.idGroup2)
  subjects: Subject[];
}