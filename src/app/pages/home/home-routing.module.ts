import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';

const ROUTE: Routes = [
    {
        path: '',
        component: HomeComponent,
    }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTE)],
  exports: [RouterModule]
})
export class HomeRoutingModule { 
  constructor() {
    console.log(ROUTE);
  }
}
