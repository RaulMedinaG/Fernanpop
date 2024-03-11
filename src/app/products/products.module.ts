import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { MainComponent } from './pages/main/main.component';
import { DetailsComponent } from './pages/details/details.component';
import { ErrorComponent } from './pages/error/error.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategorysComponent } from './pages/categorys/categorys.component';
import { EditComponent } from './pages/edit/edit.component';
import { AddComponent } from './pages/add/add.component';
import { EuroFormatPipe } from './pipes/euro-format.pipe';


@NgModule({
  declarations: [
    MainComponent,
    DetailsComponent,
    ErrorComponent,
    CategorysComponent,
    EditComponent,
    AddComponent,
    EuroFormatPipe
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ProductsModule { }
