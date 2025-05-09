import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { CategoryService } from '../../services/category.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-confirm',
  standalone: true,
  imports: [ FormsModule, ReactiveFormsModule, MatDialogTitle, MatDialogActions, MatButtonModule, MatDialogContent, MatDialogTitle, MatDialogActions],
  templateUrl: './confirm.component.html',
  styleUrl: './confirm.component.css'
})
export class ConfirmComponent {

  readonly catecogryService = inject(CategoryService);
  readonly dialogRef = inject(MatDialogRef);
  public dialogData = inject(MAT_DIALOG_DATA);

  onNoClick() {
      this.dialogRef.close(3);
  }

  delete() {
    if (this.dialogData !== null) {
      this.catecogryService.deleteCategory(this.dialogData.id).subscribe({
        next: (data) => {
          this.dialogRef.close(1);
        },
        error: (error) => {
          this.dialogRef.close(2);
        }
      });
      return;
    }

    this.dialogRef.close(2);
  }
}
