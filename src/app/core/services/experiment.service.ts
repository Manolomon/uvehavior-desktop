import { Injectable } from '@angular/core';
import { Experiment } from '../models/entities';

@Injectable({
  providedIn: 'root',
})
export class ExperimentService {
  currentExperiment: Experiment;
}
