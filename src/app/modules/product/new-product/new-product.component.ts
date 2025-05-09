import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { NgFor } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';

import { CategoryService } from '../../shared/services/category.service';
import { ProductService } from '../../shared/services/product.service';
import { CategoryElement } from '../../shared/models/category.model';


@Component({
  selector: 'app-new-product',
  standalone: true,
  imports: [NgFor, FormsModule, ReactiveFormsModule, MatIconModule, MatFormFieldModule, MatDialogModule, MatButtonModule, MatInputModule, MatSelectModule],
  templateUrl: './new-product.component.html',
  styleUrl: './new-product.component.css'
})
export class NewProductComponent implements OnInit {
  public productForm: FormGroup = new FormGroup({});
  formStatus: string = "";
  categories: CategoryElement[] = [];
  selectedFile: File | null = null;
  nameImage: string = '';

  readonly fb = inject(FormBuilder);
  readonly categoryService = inject(CategoryService);
  readonly productService = inject(ProductService);
  readonly dialogRef = inject(MatDialogRef);
  public dialogData = inject(MAT_DIALOG_DATA);

  ngOnInit(): void {
    this.formStatus = "Agregar Nuevo";
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      quantity: ['', Validators.required],
      category: ['', Validators.required],
      picture: ['', Validators.required]
    });
    this.getCategories();

    if(this.dialogData) {
      this.formStatus = "Actualizar";
      this.updateForm(this.dialogData);
    }
  }

  onSave() {
    let data = {
      name: this.productForm.value.name,
      price: this.productForm.value.price,
      quantity: this.productForm.value.quantity,
      category: this.productForm.value.category,
      picture: this.selectedFile
    }

    const uploadImageData = new FormData();
    if (data?.picture) {
      uploadImageData.append('picture', data.picture, data.picture.name);
    }
    uploadImageData.append('name', data.name);
    uploadImageData.append('price', data.price);
    uploadImageData.append('quantity', data.quantity);
    uploadImageData.append('categoryId', data.category);

    if(this.dialogData) {
      this.productService.updateProduct(this.dialogData.id, uploadImageData)
      .subscribe({
        next: (data: any) => {
          this.dialogRef.close(1);
        },
        error: (error: any) => {
          this.dialogRef.close(2);
        }
      });
    } else {
      this.productService.saveProduct(uploadImageData)
      .subscribe({
        next: (data: any) => {
          this.dialogRef.close(1);
        },
        error: (error: any) => {
          this.dialogRef.close(2);
        }
      });
    }

  }

  onCancel() {
    this.dialogRef.close(3);
  }

  getCategories() {
    this.categoryService.getCategories()
    .subscribe({
      next: (data: any) => {
        this.categories = data.categoryResponse.category;
      },
      error: (error) => {
        console.error('Error fetching categories:', error);
      }
    });
  }

  onFileSelected(event: any){
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      this.nameImage = this.selectedFile.name;
    }
  }

  updateForm(data: any) {
    this.productForm.patchValue({
        name: this.dialogData.name,
        price: this.dialogData.price,
        quantity: this.dialogData.quantity,
        category: this.dialogData.category.id
      });
      this.selectedFile = null;
      this.nameImage = '';
  }
}
