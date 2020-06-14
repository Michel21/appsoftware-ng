import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { NgForm, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Department } from 'src/app/models/department';
import { ProductsService } from './products.service';
import { DepartmentsService } from '../departments/departments.service';
import { Product } from 'src/app/models/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  productForm: FormGroup = this.fb.group({
    _id: [null],
    name: ['', [Validators.required]],
    stock: [0, [Validators.required, Validators.min(0)]],
    price: [0, [Validators.required, Validators.min(0)]],
    departments: [[], [Validators.required]]
  });

  // @ViewChild('form') form: NgForm;

  products: Product[] = [];
  departments: Department[] = [];

  private unsubscribe$: Subject<any> = new Subject<any>();

  constructor(
    private productsService: ProductsService,
    private fb: FormBuilder,
    private departmentService: DepartmentsService,
    private snackbar: MatSnackBar,
    private route: Router) { }

  ngOnInit() {

    this.productsService.get()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((prods) => this.products = prods);
    this.departmentService.get()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((deps) => this.departments = deps);

  }

  ngOnDestroy() {
    this.unsubscribe$.next();
  }

  save() {
    let data = this.productForm.value;
    if (data._id != null) {
      this.productsService.update(data)
        .subscribe(
          (p) => this.notify("Updated!")
        );
    }
    else {
      this.productsService.add(data)
        .subscribe(
          (p) => this.notify("Inserted!!")
        );
    }
    this.resetForm();
  }

  delete(p: Product) {
    this.productsService.del(p)
      .subscribe(
        () => this.notify("Deleted!"),
        (err) => console.log(err)
      )
  }

  edit(p: Product) {
    this.productForm.setValue(p);
  }

  notify(msg: string) {
    this.snackbar.open(msg, "OK", { duration: 3000 });
  }

  resetForm() {
    this.productForm.reset();
    // Checar: https://github.com/angular/material2/issues/4190
    // this.form.resetForm();
  }
  back() {
    this.route.navigateByUrl('/main/departments')
  }

}
