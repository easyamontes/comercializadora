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
  MatExpansionModule,
  MatTooltipModule
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
    MatExpansionModule,
    MatTooltipModule
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
    MatExpansionModule,
    MatTooltipModule
  ],
})
export class MaterialModule { }