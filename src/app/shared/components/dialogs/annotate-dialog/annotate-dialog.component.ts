import { Component, ViewChild, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { Experiment, Behavior } from '../../../../core/models/entities';
import { ExperimentService } from '../../../../core/services/experiment.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-annotate-dialog',
  templateUrl: './annotate-dialog.component.html',
  styleUrls: ['./annotate-dialog.component.scss'],
})
export class AnnotateDialogComponent implements OnInit {
  currentExperiment: Experiment;
  analysisForm: FormGroup;
  behaviorsForm: FormGroup;
  selectedBehaviors: Behavior[];
  currentSubject: number;
  filename: string;
  filePath: string;
  @ViewChild('behaviors') behaviors: any;

  constructor(
    protected ref: NbDialogRef<AnnotateDialogComponent>,
    private experimentService: ExperimentService,
    private router: Router
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

  ngOnInit(): void {
    if (this.currentSubject != undefined) {
      this.analysisForm.controls.subject.setValue(this.currentSubject);
    }
  }

  cancel() {
    this.router.navigate([`experiment/${this.currentExperiment.idExperiment}`]);
    this.ref.close();
  }

  startAnnotation() {
    let selected = this.analysisForm.get('subject').value;
    let selectedGroup = this.currentExperiment.groups.find((group) =>
      group.subjects.find((subject) => subject.idSubject == selected)
    );
    let subject = selectedGroup.subjects.find((subject) => subject.idSubject == selected);
    this.ref.close({
      subject: subject,
      groupName: selectedGroup.name,
      test: this.analysisForm.get('test').value,
      behaviors: this.behaviorsForm.get('behaviors').value,
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

  restartBehaviors() {
    this.behaviors.reset();
  }
}
