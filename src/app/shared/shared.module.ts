import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponentComponent } from './input-component/input-component.component';
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    InputComponentComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
 exports:[InputComponentComponent]
})
export class SharedModule { }
