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
  MatMenuModule,
  MatTooltipModule,
  MatExpansionModule
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
    MatMenuModule,
    MatTooltipModule,
    MatExpansionModule

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
    MatMenuModule,
    MatTooltipModule,
    MatExpansionModule

  ],
})
export class MaterialModule { }