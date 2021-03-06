import { Injectable } from '@angular/core';
import { Connection, ConnectionOptions, createConnection, SelectQueryBuilder } from 'typeorm';
import { Settings } from './settings';
import {
  Experiment,
  Test,
  Group,
  Subject,
  Evaluation,
  Behavior,
  BehaviorEvaluation,
  Annotation,
} from '../../models/entities';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  public connection: Promise<Connection>;
  private readonly options: ConnectionOptions;

  constructor() {
    Settings.initialize();
    this.options = {
      type: 'sqlite',
      database: Settings.dbPath,
      entities: [Experiment, Test, Group, Subject, Evaluation, Behavior, BehaviorEvaluation, Annotation],
      synchronize: true,
      logging: 'all',
    };
    this.connection = createConnection(this.options);
  }

  async getLatestExperiments() {
    return (await this.connection)
      .getRepository(Experiment)
      .createQueryBuilder('experiment')
      .orderBy('lastModifiedDate', 'DESC')
      .getMany();
  }

  async getExperimentData(idExperiment) {
    return (await this.connection).getRepository(Experiment).findOne({
      relations: ['tests', 'groups', 'groups.subjects', 'tests.behaviors'],
      where: {
        idExperiment: idExperiment,
      },
    });
  }

  async deleteBehaviorRecords(behavior: Behavior) {
    return (await this.connection)
      .getRepository(Behavior)
      .findOne({
        relations: ['behaviorEvaluations', 'behaviorEvaluations.evaluation'],
        where: {
          idBehavior: behavior.idBehavior,
        },
      })
      .then((beh) => {
        beh.behaviorEvaluations.map((bh) => {
          bh.evaluation.remove();
        });
        behavior.remove();
      });
  }

  async saveEvaluation(evaluation: Evaluation) {
    return (await this.connection).getRepository(Evaluation).save(evaluation);
  }

  async getSubjectEvaluations(idSubject) {
    return (await this.connection).getRepository(Subject).findOne({
      //relations: ['evaluations', 'evaluations.behaviorEvaluations'],
      where: {
        idSubject: idSubject,
      },
      join: {
        alias: 'subject',
        leftJoinAndSelect: {
          evaluations: 'subject.evaluations',
          behaviorEvaluations: 'evaluations.behaviorEvaluations',
          behavior: 'behaviorEvaluations.behavior',
          test: 'behavior.test',
        },
      },
    });
  }
  async getExperimentEvaluations(idExperiment) {
    return (await this.connection).getRepository(Evaluation).find({
      //relations: ['subject', 'subject.group', 'behaviorEvaluations', 'behaviorEvaluations.behavior'],
      where: (qb: SelectQueryBuilder<Subject>) => {
        qb.where({}).andWhere('group.experiment.idExperiment = :idExperiment', { idExperiment: idExperiment }); // Filter related field
      },
      join: {
        alias: 'evaluation',
        leftJoinAndSelect: {
          subject: 'evaluation.subject',
          group: 'subject.group',
          behaviorEvaluations: 'evaluation.behaviorEvaluations',
          behavior: 'behaviorEvaluations.behavior',
          test: 'behavior.test',
        },
      },
    });
  }

  async downloadTimelog(idEvaluation) {
    return (await this.connection).query(
      `
      SELECT b.name as behavior, a.timeLog FROM annotation a
      INNER JOIN behavior_evaluation be ON a.behaviorEvaluationIdBehaviorEvaluation = be.idBehaviorEvaluation
        INNER JOIN behavior b ON b.idBehavior = be.behaviorIdBehavior
          INNER JOIN evaluation e ON e.idEvaluation = be.evaluationIdEvaluation WHERE e.idEvaluation = :idEvaluation
            ORDER BY a.timeLog`,
      {
        ':idEvaluation': idEvaluation,
      } as any
    );
  }

  async downloadExperiment(idExperiment) {
    return (await this.connection).query(
      `
      SELECT g.name AS "group", s.name AS "subject", t.name AS "test", e.evaluationDate AS "date",
        e.finishingTime AS "analysisTime", b.name AS "behavior", be.latency AS "latency", be.frequency AS "frequency",
        be.totalTime AS "totalTime" FROM experiment ex
        INNER JOIN "group" g ON ex.idExperiment = g.experimentIdExperiment
        INNER JOIN subject s ON g.idGroup = s.groupIdGroup
        INNER JOIN evaluation e ON s.idSubject = e.subjectIdSubject
        INNER JOIN behavior_evaluation be ON be.evaluationIdEvaluation = e.idEvaluation
        INNER JOIN behavior b ON b.idBehavior = be.behaviorIdBehavior
        INNER JOIN test t ON t.idTest = b.testIdTest WHERE ex.idExperiment = :idExperiment
          ORDER BY "group", "subject", "test"`,
      {
        ':idExperiment': idExperiment,
      } as any
    );
  }
}
