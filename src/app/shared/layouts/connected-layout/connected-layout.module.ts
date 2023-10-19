import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConnectedLayoutComponent } from './connected-layout.component';
import { ConnectedLayoutRoutingModule } from './connected-layout-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
// import { NavbarComponent } from '../../navbar/navbar.component';


@NgModule({
    declarations: [
        ConnectedLayoutComponent,
        // NavbarComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ConnectedLayoutRoutingModule,
        SharedModule,
    ]
})
export class ConnectedLayoutModule { }
