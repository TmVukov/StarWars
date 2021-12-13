import { Vehicle } from './../starwars.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  public vehicleForm: FormGroup;
  public type: string;

  public humanColor: boolean;
  public droidColor: boolean;

  @Output() onUpdate: EventEmitter<Vehicle[]>;

  constructor() {
    this.onUpdate = new EventEmitter();
  }

  ngOnInit(): void {
    this.createForm();
    this.type = sessionStorage.getItem('specieType');
  }

  public handleSubmit(): void {
    let formValue = this.vehicleForm.getRawValue();
    this.handleFormData(this.type, formValue);
    this.vehicleForm.reset();
  }

  private handleFormData(type: string, data: any) {
    let storage, vehiclesHuman, vehiclesDroid;

    storage = sessionStorage.getItem(`storageData-${type}`);

    if (storage === null) {
      vehiclesHuman = [];
      vehiclesDroid = [];
    } else {
      vehiclesHuman = JSON.parse(storage);
      vehiclesDroid = JSON.parse(storage);
    }

    switch (type) {
      case 'Human':
        vehiclesHuman.push({ ...data, deletable: true });
        sessionStorage.setItem(
          `storageData-${type}`,
          JSON.stringify(vehiclesHuman)
        );
        this.onUpdate.emit(vehiclesHuman);
        break;
      case 'Droid':
        vehiclesDroid.push({ ...data, deletable: true });
        sessionStorage.setItem(
          `storageData-${type}`,
          JSON.stringify(vehiclesDroid)
        );
        this.onUpdate.emit(vehiclesDroid);
        break;
      default:
    }
  }

  private createForm(): void {
    this.vehicleForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      model: new FormControl(null),
      manufacturer: new FormControl(null),
      cost_in_credits: new FormControl(null),
      created: new FormControl(null),
    });
  }
}
