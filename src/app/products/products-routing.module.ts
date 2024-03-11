import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { DetailsComponent } from './pages/details/details.component';
import { ErrorComponent } from './pages/error/error.component';
import { CategorysComponent } from './pages/categorys/categorys.component';
import { EditComponent } from './pages/edit/edit.component';
import { AddComponent } from './pages/add/add.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'product/:id', component: DetailsComponent },
  { path: 'edit/:id', component: EditComponent },
  { path: 'add/product', component: AddComponent },
  { path: 'category/:category', component: CategorysComponent },
  { path: 'error', component: ErrorComponent },
  { path: '**', redirectTo: 'error' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
