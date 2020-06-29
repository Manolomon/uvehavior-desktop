import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  headerEvent: Subject<Event> = new Subject<Event>();

  currentBack = '#';

  emitHeaderBind() {
    this.headerEvent.next();
  }
}
