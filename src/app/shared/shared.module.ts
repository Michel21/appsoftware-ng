import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { FooterComponentsComponent } from './components/footer-components/footer-components.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LoaderComponent } from './components/loader/loader.component'

//  Data Formato Brasil
import localePt from '@angular/common/locales/pt';
registerLocaleData(localePt);

@NgModule({
  declarations: [FooterComponentsComponent, LoaderComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    FlexLayoutModule,
  ],
  exports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    FlexLayoutModule,
    FooterComponentsComponent,
    LoaderComponent
  ],
  providers: [
    { provide: LOCALE_ID, useValue: "pt-br" },
  ],
})
export class SharedModule { }
