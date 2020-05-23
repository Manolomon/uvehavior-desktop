import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, JoinColumn, OneToMany, ManyToOne } from "typeorm";

@Entity({ name: 'experiment' })
export class Experiment extends BaseEntity {

    @PrimaryGeneratedColumn()
    idExperiment: number;

    @Column()
    name: string;

    @Column()
    description: string | null;

    @Column("date", { name: "evaluationDate", default: () => "date('now')" })
    creationDate: Date

    @Column({ type: "datetime" })
    lastModifiedDate: Date

    @OneToMany(() => Test, (test) => test.experiment)
    tests: Test[];

    @OneToMany(() => Group, (group) => group.experiment)
    groups: Group[];
}

@Entity({ name: 'test' })
export class Test extends BaseEntity {

    @PrimaryGeneratedColumn()
    idTest: number;

    @Column()
    idExperiment: string;

    @Column()
    name: string;

    @Column()
    description: string | null;

    @Column()
    time: number;

    @ManyToOne(() => Experiment, (experiment) => experiment.tests, {
        onDelete: "CASCADE",
      })
    @JoinColumn([{ name: "idExperiment" }])
    experiment: Experiment;

    @OneToMany(() => Behavior, (behavior) => behavior.test)
    behaviors: Behavior[];
}


@Entity("group")
export class Group {
  @PrimaryGeneratedColumn()
  idGroup: number;

  @Column()
  idExperiment: number;

  @Column()
  name: string;

  @Column()
  description: string | null;

  @ManyToOne(() => Experiment, (experiment) => experiment.groups, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "idExperiment" }])
  experiment: Experiment;

  @OneToMany(() => Subject, (subject) => subject.group)
  subjects: Subject[];
}

@Entity("subject")
export class Subject {
  @PrimaryGeneratedColumn()
  idSubject: number;

  @Column()
  idGroup: number;

  @Column()
  name: string;

  @ManyToOne(() => Group, (group) => group.subjects, { onDelete: "CASCADE" })
  @JoinColumn([{ name: "idGroup" }])
  group: Group;

  @OneToMany(() => Evaluation, (evaluation) => evaluation.subject)
  evaluations: Evaluation[];
}

@Entity("evaluation")
export class Evaluation {
  @PrimaryGeneratedColumn()
  idEvaluation: number;

  @Column()
  idSubject: number;

  @Column()
  videoPath: string;

  @Column("date", { name: "evaluationDate", default: () => "date('now')" })
  evaluationDate: string;

  @ManyToOne(() => Subject, (subject) => subject.evaluations, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "idSubject" }])
  subject: Subject;

  @OneToMany(
    () => BehaviorEvaluation,
    (behaviorEvaluation) => behaviorEvaluation.evaluation
  )
  behaviorEvaluations: BehaviorEvaluation[];
}

@Entity("behavior_evaluation")
export class BehaviorEvaluation {
  @PrimaryGeneratedColumn()
  idEvaluation: number;

  @Column()
  idBehavior: number;

  @Column()
  idBehaviorEvaluation: number;

  @Column()
  latency: number | null;

  @Column()
  frequency: number | null;

  @Column()
  totalTime: number | null;

  @ManyToOne(() => Behavior, (behavior) => behavior.behaviorEvaluations, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "idBehavior" }])
  behavior: Behavior;

  @ManyToOne(() => Evaluation, (evaluation) => evaluation.behaviorEvaluations)
  @JoinColumn([{ name: "idEvaluation" }])
  evaluation: Evaluation;

  @OneToMany(
    () => Annotation,
    (annotation) => annotation.behaviorEvaluation
  )
  annotations: Annotation[];
}

@Entity("behavior")
export class Behavior {
  @PrimaryGeneratedColumn()
  idBehavior: number;

  @Column()
  idTest: number;

  @Column()
  name: string;

  @Column("varchar", { length: 1 })
  associatedKey: string;

  @ManyToOne(() => Test, (test) => test.behaviors, { onDelete: "CASCADE" })
  @JoinColumn([{ name: "idTest" }])
  test: Test;

  @OneToMany(
    () => BehaviorEvaluation,
    (behaviorEvaluation) => behaviorEvaluation.behavior
  )
  behaviorEvaluations: BehaviorEvaluation[];
}

@Entity("annotation")
export class Annotation {
  @PrimaryGeneratedColumn()
  idAnnotation: number;

  @Column()
  idBehaviorEvaluation: number;

  @Column()
  timeLog: number;

  @ManyToOne(() => BehaviorEvaluation, (behaviorEvaluation) => behaviorEvaluation.annotations, { onDelete: "CASCADE" })
  @JoinColumn([{ name: "idTest" }])
  behaviorEvaluation: BehaviorEvaluation;
}