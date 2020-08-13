import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  JoinColumn,
  OneToMany,
  ManyToOne,
  UpdateDateColumn,
  CreateDateColumn,
  Timestamp,
} from 'typeorm';

@Entity({ name: 'experiment' })
export class Experiment extends BaseEntity {
  @PrimaryGeneratedColumn()
  idExperiment: number;

  @Column()
  name: string;

  @Column()
  description: string | null;

  @CreateDateColumn()
  creationDate: Timestamp;

  @UpdateDateColumn()
  lastModifiedDate: Timestamp;

  @OneToMany(() => Test, (test) => test.experiment, {
    cascade: true,
  })
  tests: Test[];

  @OneToMany(() => Group, (group) => group.experiment, {
    cascade: true,
  })
  groups: Group[];
}

@Entity({ name: 'test' })
export class Test extends BaseEntity {
  @PrimaryGeneratedColumn()
  idTest: number;

  @Column()
  name: string;

  @Column()
  description: string | null;

  @Column()
  duration: number;

  @ManyToOne(() => Experiment, (experiment) => experiment.tests, { onDelete: 'CASCADE' })
  @JoinColumn()
  experiment: Experiment;

  @OneToMany(() => Behavior, (behavior) => behavior.test, {
    cascade: true,
  })
  behaviors: Behavior[];
}

@Entity('group')
export class Group extends BaseEntity {
  @PrimaryGeneratedColumn()
  idGroup: number;

  @Column()
  name: string;

  @Column()
  description: string | null;

  @ManyToOne(() => Experiment, (experiment) => experiment.groups, { onDelete: 'CASCADE' })
  @JoinColumn()
  experiment: Experiment;

  @OneToMany(() => Subject, (subject) => subject.group, { cascade: ['insert', 'recover'] })
  subjects: Subject[];
}

@Entity('subject')
export class Subject extends BaseEntity {
  @PrimaryGeneratedColumn()
  idSubject: number;

  @Column()
  name: string;

  @ManyToOne(() => Group, (group) => group.subjects, { onDelete: 'CASCADE' })
  @JoinColumn()
  group: Group;

  @OneToMany(() => Evaluation, (evaluation) => evaluation.subject, {
    cascade: true,
  })
  evaluations: Evaluation[];
}

@Entity('evaluation')
export class Evaluation extends BaseEntity {
  @PrimaryGeneratedColumn()
  idEvaluation: number;

  @Column()
  name: string | null;

  @Column()
  videoPath: string;

  @CreateDateColumn()
  evaluationDate: Timestamp;

  @Column()
  finishingTime: number;

  @ManyToOne(() => Subject, (subject) => subject.evaluations, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  subject: Subject;

  @OneToMany(() => BehaviorEvaluation, (behaviorEvaluation) => behaviorEvaluation.evaluation, {
    cascade: true,
  })
  behaviorEvaluations: BehaviorEvaluation[];
}

@Entity('behavior_evaluation')
export class BehaviorEvaluation extends BaseEntity {
  @PrimaryGeneratedColumn()
  idBehaviorEvaluation: number;

  @Column()
  latency: number | null;

  @Column()
  frequency: number | null;

  @Column()
  totalTime: number | null;

  @ManyToOne(() => Behavior, (behavior) => behavior.behaviorEvaluations, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  behavior: Behavior;

  @ManyToOne(() => Evaluation, (evaluation) => evaluation.behaviorEvaluations, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  evaluation: Evaluation;

  @OneToMany(() => Annotation, (annotation) => annotation.behaviorEvaluation, {
    cascade: true,
  })
  annotations: Annotation[];
}

@Entity('behavior')
export class Behavior extends BaseEntity {
  @PrimaryGeneratedColumn()
  idBehavior: number;

  @Column()
  name: string;

  @Column('varchar', { length: 1 })
  associatedKey: string;

  @ManyToOne(() => Test, (test) => test.behaviors, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  test: Test;

  @OneToMany(() => BehaviorEvaluation, (behaviorEvaluation) => behaviorEvaluation.behavior, {
    cascade: true,
  })
  behaviorEvaluations: BehaviorEvaluation[];
}

@Entity('annotation')
export class Annotation extends BaseEntity {
  @PrimaryGeneratedColumn()
  idAnnotation: number;

  @Column()
  timeLog: number;

  @ManyToOne(() => BehaviorEvaluation, (behaviorEvaluation) => behaviorEvaluation.annotations, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  behaviorEvaluation: BehaviorEvaluation;
}
