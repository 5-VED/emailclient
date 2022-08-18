import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-input-component',
  templateUrl: './input-component.component.html',
  styleUrls: ['./input-component.component.css']
})
export class InputComponentComponent implements OnInit {
  @Input() label: string;
  @Input() control: FormControl;
  @Input() inputType: any;

  

  constructor() {
  }

  ngOnInit(): void {
  }

  showErrors() {
    const {dirty, touched, errors} = this.control
    return (dirty || touched) && errors
  }
}

