import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { CategoryService } from '../../services/category.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-confirm',
  standalone: true,
  imports: [ FormsModule, ReactiveFormsModule, MatDialogTitle, MatDialogActions, MatButtonModule, MatDialogContent, MatDialogTitle, MatDialogActions],
  templateUrl: './confirm.component.html',
  styleUrl: './confirm.component.css'
})
export class ConfirmComponent {

  readonly catecogryService = inject(CategoryService);
  readonly productService = inject(ProductService);
  readonly dialogRef = inject(MatDialogRef);
  public dialogData = inject(MAT_DIALOG_DATA);

  onNoClick() {
      this.dialogRef.close(3);
  }

  delete() {
    if (this.dialogData !== null) {

      if (this.dialogData.module === 'category') {
        this.catecogryService.deleteCategory(this.dialogData.id).subscribe({
          next: (data) => {
            this.dialogRef.close(1);
          },
          error: (error) => {
            this.dialogRef.close(2);
          }
        });
      } else if (this.dialogData.module === 'product') {
        this.productService.deleteProduct(this.dialogData.id).subscribe({
          next: (data) => {
            this.dialogRef.close(1);
          },
          error: (error) => {
            this.dialogRef.close(2);
          }
        });
      }
    }
    this.dialogRef.close(2);
  }
}
