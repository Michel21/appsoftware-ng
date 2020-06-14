import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DepartmentsComponent } from './departments/departments.component';
import { ProductsComponent } from './products/products.component';
import { PeopleComponent } from './people/people.component';


const routes: Routes = [
  { path: 'people', component: PeopleComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'departments', component: DepartmentsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
