import { NgModule } from '@angular/core';
import {
  MatGridListModule,
  MatButtonModule,
  MatCheckboxModule,
  MatInputModule,
  MatFormFieldModule,
  MatSelectModule,
  MatTableModule,
  MatPaginatorModule,
  MatIconModule,
  MatListModule,
  MatDialogModule,
  MatSnackBarModule,
  MatButtonToggleModule,
  MatSidenavModule,
  MatToolbarModule,
  MatMenuModule
} from '@angular/material';


@NgModule({
  imports: [
    MatGridListModule,
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatListModule,
    MatDialogModule,
    MatSnackBarModule,
    MatButtonToggleModule,
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule
  ],
  exports: [
    MatGridListModule,
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatListModule,
    MatDialogModule,
    MatSnackBarModule,
    MatButtonToggleModule,
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule
  ],
})
export class MaterialModule { }