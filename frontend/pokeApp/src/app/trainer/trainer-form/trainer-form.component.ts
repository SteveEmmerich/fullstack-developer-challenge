import { Component, OnInit, Input, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'trainer-form',
  template: `
    <form id="trainer-form" [formGroup]="updateTrainerForm" ngxsForm="trainers.updateTrainerForm"
      (ngSubmit)="onSubmits(trainer.id, age.value)">
      <ion-item>
        <ion-label>Age:</ion-label>
        <div *ngIf="!edit">{{trainer.age}}</div>
        <ion-input *ngIf="edit" type="text" formControlName="age" #age></ion-input>
      </ion-item>
      <ion-item>
        <ion-label>Email:</ion-label>
        {{ trainer.email }}
      </ion-item>
      <ion-item>
        <ion-label>Number Of Pokemon:</ion-label>
        {{ pokemonCount$ | async }}
      </ion-item>
    </form>
  `,
  styleUrls: ['./trainer-form.component.scss'],
})
export class TrainerFormComponent implements OnInit {
  updateTrainerForm = new FormGroup({
    age: new FormControl()
  });
  @Input() onSubmit;
  @Input() trainer;
  @Input() edit = false;
  constructor() { }

  ngOnInit() {}
  onSubmits(id, age) {
    console.log(`id: ${id}, age: ${age}`);
  }

}
