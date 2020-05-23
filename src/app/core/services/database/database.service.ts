import { Injectable } from '@angular/core';
import { Connection, ConnectionOptions, createConnection, Repository } from 'typeorm';
import { Settings } from './settings';
import { Experiment,
        Test,
        Group,
        Subject,
        Evaluation,
        Behavior,
        BehaviorEvaluation,
        Annotation } from '../../models/entities';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  public connection: Promise<Connection>;
  private readonly options: ConnectionOptions;

  constructor() {
    Settings.initialize();
    this.options = {
      type: 'sqlite',
      database: Settings.dbPath,
      entities: [
        Experiment,
        Test,
        Group,
        Subject,
        Evaluation,
        Behavior,
        BehaviorEvaluation,
        Annotation
      ],
      synchronize: true,
      logging: 'all',
    };
    this.connection = createConnection(this.options);
  }

  async getLatestExperiments() {
    return (await this.connection).getRepository(Experiment)
      .createQueryBuilder("experiment")
      .orderBy("lastModifiedDate", "DESC")
      .limit(3).getMany();
  }

  async getExperimentData(idExperiment) {
    return (await this.connection).getRepository(Experiment)
    .findOne({
      relations: ['tests', 'groups', 'groups.subjects'],
      where: { 
        idExperiment: idExperiment}
      },
    );
  }
}
