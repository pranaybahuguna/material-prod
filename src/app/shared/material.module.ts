import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
 
import {MatButtonModule, MatIconModule} from '@angular/material'
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';


@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule
  ],
  exports : [
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule
  ],
  declarations: []
})
export class MaterialModule { }
