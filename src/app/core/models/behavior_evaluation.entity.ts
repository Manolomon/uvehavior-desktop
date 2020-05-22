import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, PrimaryColumn, ManyToOne, JoinColumn } from "typeorm";
import { Behavior } from './behavior.entity';
import { Evaluation } from './evaluation.entity';

@Entity({ name: 'behavior_evaluation' })
export class BehaviorEvaluation extends BaseEntity {

  @PrimaryGeneratedColumn({ name: "idBehaviorEvaluation" })
  id: number;

  @PrimaryColumn()
  idBehavior: number;

  @PrimaryColumn()
  idEvaluation: number;

  @Column("real")
  latency: number | null;

  @Column("integer")
  frequency: number | null;

  @Column("real")
  totalTime: number | null;

  @ManyToOne(() => Behavior, (behavior) => behavior.behaviorEvaluations, {
    onDelete: "CASCADE",
  })

  @JoinColumn([{ name: "idBehavior", referencedColumnName: "idBehavior" }])
  idBehavior2: Behavior;

  @ManyToOne(() => Evaluation, (evaluation) => evaluation.behaviorEvaluations)

  @JoinColumn([{ name: "idEvaluation", referencedColumnName: "idEvaluation" }])
  idEvaluation2: Evaluation;
}