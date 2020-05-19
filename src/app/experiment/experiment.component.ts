import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-experiment',
  templateUrl: './experiment.component.html',
  styleUrls: ['./experiment.component.scss']
})
export class ExperimentComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
  ) { }

  id: number;

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
  }

}
