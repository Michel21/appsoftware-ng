import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Department } from 'src/app/models/department';
import { DepartmentsService } from './departments.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.scss']
})
export class DepartmentsComponent implements OnInit {

  formDepart: FormGroup;
  departments: Department[] = [];
  private unsubscribe$: Subject<any> = new Subject();
  depEdit: Department = null;

  constructor(
    private departmentService: DepartmentsService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private route: Router) { }

  ngOnInit() {
    this.formDepart = this.fb.group({
      depName: ['', Validators.required]
    })
    this.departmentService.get()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((deps) => this.departments = deps);
  }

  save() {
    if (this.depEdit) {
      this.departmentService.update(
        { name: this.formDepart.get('depName').value, _id: this.depEdit._id })
        .subscribe(
          (dep) => {
            this.notify('Updated!');
            this.route.navigateByUrl('main/products');
          },
          (err) => {
            this.notify('Error');
            console.error(err);
          }
        )
    }
    else {
      this.departmentService.add({ name: this.formDepart.get('depName').value })
        .subscribe(
          (dep) => {
            console.log(dep);
            this.route.navigateByUrl('main/products');
            this.notify('Inserted!');
          },
          (err) => console.error(err))
    }
    this.clearFields();
  }

  clearFields() {
    this.formDepart.get('depName').setValue('');
    this.depEdit = null;
  }

  cancel() {
    this.clearFields();
  }

  edit(dep: Department) {
    this.formDepart.get('depName').setValue(dep.name);
    this.depEdit = dep;
  }

  delete(dep: Department) {
    this.departmentService.del(dep)
      .subscribe(
        () => this.notify('Removed!'),
        (err) => this.notify(err.error.msg)
      )
  }

  notify(msg: string) {
    this.snackBar.open(msg, "OK", { duration: 3000 });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
  }
}
