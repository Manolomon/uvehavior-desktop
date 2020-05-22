import { Injectable } from '@angular/core';
import { Connection, ConnectionOptions, createConnection, Repository } from 'typeorm';
import { Settings } from './settings';
import { Experiment } from '../../models/experiment.entity';
import { Test } from '../../models/test.entity';
import { BehaviorEvaluation } from '../../models/behavior_evaluation.entity';
import { Annotation } from '../../models/annotation.entity';
import { Behavior } from '../../models/behavior.entity';
import { Evaluation } from '../../models/evaluation.entity';
import { Groups } from '../../models/groups.entity';
import { Subject } from '../../models/subject.entity';

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
        Annotation,
        BehaviorEvaluation,
        Behavior,
        Evaluation,
        Experiment,
        Groups,
        Subject,
        Test
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
      .limit(3).getMany()
  }
}
