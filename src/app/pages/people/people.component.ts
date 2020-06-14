import { Component, OnInit } from '@angular/core';
import { Person } from '../../models/person';
import { Observable } from 'rxjs';
import { MainService } from '../main.service';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit {

  people$: Observable<Person[]>;

  constructor(private mainService: MainService) { }

  ngOnInit() {
    this.people$ = this.mainService.getPeople();
  }

}
