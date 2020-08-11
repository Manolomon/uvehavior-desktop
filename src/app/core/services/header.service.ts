import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  headerEvent: Subject<string> = new Subject<string>();

  constructor() {}

  emitHeaderBind() {
    this.headerEvent.next();
  }
}
