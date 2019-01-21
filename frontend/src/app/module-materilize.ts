import {
<<<<<<< HEAD
  MatButtonModule,
  MatCheckboxModule,
  MatInputModule,
  MatFormFieldModule,
  MatSelectModule,
  MatTableModule,
  MatPaginatorModule
=======
  MatFormFieldModule,
  MatButtonModule,
  MatCheckboxModule,
  MatInputModule,
  MatIconModule
>>>>>>> 60cb2c65cf445f4a7439d20ecc360d69ed6b5140
} from '@angular/material';
import { NgModule } from '@angular/core';


@NgModule({
  imports: [
<<<<<<< HEAD
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule
  ],
  exports: [
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule
=======
    MatButtonModule, 
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule
  ],
  exports: [
    MatButtonModule, 
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule
>>>>>>> 60cb2c65cf445f4a7439d20ecc360d69ed6b5140
  ],
})
export class MaterialModule { }