import { Component, AfterViewInit } from '@angular/core';

import { Cell, DefaultEditor, Editor } from 'ng2-smart-table';

@Component({
    template: `
    <input (keypress)="keyPress($event)" [ngClass]="inputClass" type="text" maxlength="1" placeholder="Key" class="form-control" [(ngModel)]="cell.newValue" [name]="cell.getId()"
    [disabled]="!cell.isEditable()" (click)="onClick.emit($event)" (keydown.enter)="onEdited.emit($event)"
    (keydown.esc)="onStopEditing.emit()" style="height: 35px;"> 
    `,
})
export class SmartTableKeyInputComponent extends DefaultEditor implements AfterViewInit {

    constructor() {
        super();
    }

    ngAfterViewInit() {

    }

    keyPress(event: KeyboardEvent) {
        const pattern = /[a-zA-Z0-9]/;
        const inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {    
            // invalid character, prevent input
            event.preventDefault();
        }
    }
}