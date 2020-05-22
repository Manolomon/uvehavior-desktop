import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, PrimaryColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Test } from './test.entity';
import { BehaviorEvaluation } from './behavior_evaluation.entity';

@Entity({ name: 'behavior' })
export class Behavior extends BaseEntity {

  @PrimaryGeneratedColumn({ name: "idBehavior" })
  id: number;

  @PrimaryColumn()
  idTest: number;

  @Column()
  name: string;

  @Column("varchar", { length: 1 })
  associatedKey: string;

  @ManyToOne(() => Test, (test) => test.behaviors, { onDelete: "CASCADE" })

  @JoinColumn([{ name: "idTest", referencedColumnName: "idTest" }])
  idTest2: Test;

  @OneToMany(
    () => BehaviorEvaluation,
    (behaviorEvaluation) => behaviorEvaluation.idBehavior2
  )
  behaviorEvaluations: BehaviorEvaluation[];
}