import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NbMenuItem } from '@nebular/theme';

@Component({
  selector: 'app-experiment',
  templateUrl: './experiment.component.html',
  styleUrls: ['./experiment.component.scss']
})
export class ExperimentComponent implements OnInit {

  items: NbMenuItem[] = [
    {
      title: 'Test 1',
      icon: 'flask'
    },
    {
      title: 'Test 2',
      icon: 'flask'
    },
    {
      title: 'Test 3',
      icon: 'flask'
    },
   ];

   subjects: NbMenuItem[] = [
    {
      title: 'Group 1',
      icon: 'users',
      children: [
        {
          title: 'Subject 1',
          icon: 'user-cicle'
        },
        {
          title: 'Subject 2',
          icon: 'user-cicle'
        },
        {
          title: 'Subject 3',
          icon: 'user-cicle'
        },
        {
          title: 'Subject 4',
          icon: 'user-cicle'
        },
        {
          title: 'Subject 5',
          icon: 'user-cicle'
        },
      ],
    },
    {
      title: 'Group 2',
      icon: 'users',
      children: [
        {
          title: 'Subject 1',
          icon: 'user-cicle'
        },
        {
          title: 'Subject 2',
          icon: 'user-cicle'
        },
        {
          title: 'Subject 3',
          icon: 'user-cicle'
        },
        {
          title: 'Subject 4',
          icon: 'user-cicle'
        },
        {
          title: 'Subject 5',
          icon: 'user-cicle'
        },
      ],
    },
    {
      title: 'Group 3',
      icon: 'users',
      children: [
        {
          title: 'Subject 1',
          icon: 'user-cicle'
        },
        {
          title: 'Subject 2',
          icon: 'user-cicle'
        },
        {
          title: 'Subject 3',
          icon: 'user-cicle'
        },
        {
          title: 'Subject 4',
          icon: 'user-cicle'
        },
        {
          title: 'Subject 5',
          icon: 'user-cicle'
        },
      ],
    },
    {
      title: 'Group 4',
      icon: 'users',
      children: [
        {
          title: 'Subject 1',
          icon: 'user-cicle'
        },
        {
          title: 'Subject 2',
          icon: 'user-cicle'
        },
        {
          title: 'Subject 3',
          icon: 'user-cicle'
        },
        {
          title: 'Subject 4',
          icon: 'user-cicle'
        },
        {
          title: 'Subject 5',
          icon: 'user-cicle'
        },
      ],
    },
  ];

  constructor(
    private route: ActivatedRoute,
  ) { }

  id: number;

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
  }

}
