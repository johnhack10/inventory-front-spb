import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { CategoryService } from '../../../shared/services/category.service';

@Component({
  selector: 'app-new-category',
  standalone: true,
  imports: [ FormsModule, ReactiveFormsModule, MatIconModule, MatFormFieldModule, MatDialogModule, MatButtonModule, MatInputModule ],
  templateUrl: './new-category.component.html',
  styleUrl: './new-category.component.css'
})
export class NewCategoryComponent implements OnInit {

  public categoryForm: FormGroup = new FormGroup({});
  formStatus: string = "";
  readonly fb = inject(FormBuilder);
  readonly categoryService = inject(CategoryService);
  readonly dialogRef = inject(MatDialogRef);
  public data = inject(MAT_DIALOG_DATA);

  ngOnInit(): void {
    this.formStatus = "Agregar Nueva";
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
    if (this.data !== null) {
      this.updateForm(this.data);
      this.formStatus = "Actualizar"
    }
  }

  onSave() {
    let data = {
      name: this.categoryForm.get('name')?.value,
      description: this.categoryForm.get('description')?.value
    }

    if (this.data !== null) {
        this.categoryService.updateCategory(data, this.data.id).subscribe({
          next: (data) => {
            this.dialogRef.close(1)
          },
          error: (error) => {
            this.dialogRef.close(2);
          }
        });
      return;
    }
    this.categoryService.saveCategory(data)
      .subscribe({
        next: (data) => {
          this.dialogRef.close(1);
        },
        error: (error) => {
          this.dialogRef.close(2);
        }
      });
  }

  onCancel() {
    this.dialogRef.close(3);
  }

  updateForm(data: any) {
    this.categoryForm = this.fb.group({
      name: [data.name, Validators.required],
      description: [data.description, Validators.required]
    });
  }
}
