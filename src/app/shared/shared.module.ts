import { NgModule } from '@angular/core';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MenubarModule } from 'primeng/menubar';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { CheckboxModule } from 'primeng/checkbox';
import { DataViewModule } from 'primeng/dataview';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { CalendarModule } from 'primeng/calendar';
import { SkeletonModule } from 'primeng/skeleton';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { ButtonComponent } from './components/button/button.component';
import { InputTextComponent } from './components/inputs/input-text/input-text.component';
import { IconComponent } from './components/icon/icon.component';

registerLocaleData(localeFr);

const COMPONENTS = [
  ButtonComponent,
  InputTextComponent,
  IconComponent
];

const PIPES = [
];

const DIRECTIVES = [
];

const PRIMENG = [
  MenubarModule,
  TableModule,
  DialogModule,
  ButtonModule,
  InputTextModule,
  ReactiveFormsModule,
  CalendarModule,
  CheckboxModule,
  DataViewModule,   
  TagModule,
  RatingModule,
  DropdownModule,
  SkeletonModule,
  ToastModule
];

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ...PRIMENG,
  ],
  providers: [
    // ...PIPES,
    DatePipe,
    CurrencyPipe,
    MessageService
  ],
  declarations: [
    ...COMPONENTS,
    //  ...PIPES, ...DIRECTIVES
    ],
  exports: [
    ...COMPONENTS, 
    // ...PIPES, ...DIRECTIVES, 
    ...PRIMENG]
})
export class SharedModule { }


