import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MainRoutingModule } from './main-routing.module';
import { ProductsComponent } from './products/products.component';
import { PeopleComponent } from './people/people.component';
import { DepartmentsComponent } from './departments/departments.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../shared/material.module';

@NgModule({
  declarations: [PeopleComponent, ProductsComponent, DepartmentsComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    MaterialModule,
    FormsModule
  ],
})
export class MainModule { }
