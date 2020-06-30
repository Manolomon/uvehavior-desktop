import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { NbDialogRef } from '@nebular/theme';
import { Subject, Test, Group, Experiment, Behavior } from '../../../../core/models/entities';
import { ExperimentService } from '../../../../core/services/experiment.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { truncate } from 'fs';

@Component({
  selector: 'app-annotate-dialog',
  templateUrl: './annotate-dialog.component.html',
  styleUrls: ['./annotate-dialog.component.scss'],
})
export class AnnotateDialogComponent {
  currentExperiment: Experiment;
  analysisForm: FormGroup;
  behaviorsForm: FormGroup;
  selectedBehaviors: Behavior[];
  filename: string;
  filePath: string;

  constructor(
    protected ref: NbDialogRef<AnnotateDialogComponent>,
    private experimentService: ExperimentService,
    private location: Location
  ) {
    this.analysisForm = new FormGroup({
      subject: new FormControl('', [Validators.required]),
      test: new FormControl('', [Validators.required]),
    });
    this.behaviorsForm = new FormGroup({
      behaviors: new FormControl([], [Validators.required]),
      videoFile: new FormControl('', [Validators.required]),
    });

    this.currentExperiment = this.experimentService.currentExperiment;
  }

  ngOnInit() {}

  cancel() {
    this.location.back();
    this.ref.close();
  }

  startAnnotation() {
    this.ref.close({
      subject: this.analysisForm.get('subject').value,
      test: this.analysisForm.get('test').value,
      behavior: this.behaviorsForm.get('behaviors').value,
      filePath: this.filePath,
      filename: this.filename,
    });
  }

  fileSelected(event) {
    this.filename = event.target.files[0].name;
    this.filePath = event.target.files[0].path;
  }

  overrideBehavior(behavior: Behavior) {
    return this.behaviorsForm
      .get('behaviors')
      .value.some(
        (selected) => selected.associatedKey == behavior.associatedKey && selected.idBehavior != behavior.idBehavior
      );
  }
}
