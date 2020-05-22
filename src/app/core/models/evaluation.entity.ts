import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, PrimaryColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { BehaviorEvaluation } from './behavior_evaluation.entity';
import { Subject } from './subject.entity';

@Entity({ name: 'evaluation' })
export class Evaluation extends BaseEntity {

	@PrimaryGeneratedColumn({ name: "idEvaluation" })
	id: number;

	@PrimaryColumn()
	idSubject: number;

	@Column()
	videoPath: string;

	@Column("date", { default: () => "date('now')" })
	evaluationDate: string;

	@ManyToOne(() => Subject, (subject) => subject.evaluations, {
		onDelete: "CASCADE",
	})

	@JoinColumn([{ name: "idSubject", referencedColumnName: "idSubject" }])
	idSubject2: Subject;

	@OneToMany(
		() => BehaviorEvaluation,
		(behaviorEvaluation) => behaviorEvaluation.idEvaluation2
	)
	behaviorEvaluations: BehaviorEvaluation[];
}