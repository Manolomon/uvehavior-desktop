import {Injectable} from '@angular/core';
import {Connection, ConnectionOptions, createConnection} from 'typeorm';
import {Settings} from './settings';
import {Experiment} from '../../../models/experiment.entity';

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
            entities: [Experiment],
            synchronize: true,
            logging: 'all',
        };
        this.connection = createConnection(this.options);
    }
}
