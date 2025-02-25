import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CategoryService } from '../../../shared/services/category.service';
import { CategoryElement } from '../../../shared/models/category.model';
import { NewCategoryComponent } from '../new-category/new-category.component';
import { NotificationServiceService } from '../../../shared/services/notification-service.service';
import { ConfirmComponent } from '../../../shared/components/confirm/confirm.component';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatTableModule, MatIconModule, MatPaginator],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {
  private readonly categoryService = inject(CategoryService)
  readonly dialog = inject(MatDialog)
  readonly servicioNotificacion = inject(NotificationServiceService);

  displayedColumns: string[] = ['id', 'name', 'description', 'actions'];
  dataSource = new MatTableDataSource<CategoryElement>();

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.categoryService.getCategories()
    .subscribe({
      next: (categories: any) => {
          this.processCategoriesResponse(categories);
      }
    });
  }

  processCategoriesResponse(resp: any) {
    const dataCategory: CategoryElement[] = [];
    if(resp.metadata[0].code === "00") {
      let listCategory = resp.categoryResponse.category;
      listCategory.forEach((element: CategoryElement) => {
        dataCategory.push(element);
      });

      this.dataSource = new MatTableDataSource<CategoryElement>(dataCategory);
    }
  }

  openCategoryDialog() {
      const dialogRef = this.dialog.open(NewCategoryComponent, {
        width: "450px"
      });

      dialogRef.afterClosed().subscribe(result => {
        switch (result) {
          case 1:
            this.servicioNotificacion.showNotification("Categoria Agregada", "Exitosa")
            this.getCategories();
            break;
          case 2:
            this.servicioNotificacion.showNotification("Se produjo un error al guardar la categoria", "Error")
            break;
         }
      });
  }

  edit(element: any) {
    const dialogRef = this.dialog.open(NewCategoryComponent, {
      width: "450px",
      data: { id: element.id, name: element.name, description: element.description }
    });

    dialogRef.afterClosed().subscribe(result => {
      switch (result) {
        case 1:
          this.servicioNotificacion.showNotification("Categoria Actualizada", "Exitosa")
          this.getCategories();
          break;
        case 2:
          this.servicioNotificacion.showNotification("Se produjo un error al actualizar la categoria", "Error")
          break;
       }
    });
  }

  delete(id: number) {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      data: { id: id}
    });

    dialogRef.afterClosed().subscribe(result => {
      switch (result) {
        case 1:
          this.servicioNotificacion.showNotification("Categoria Eliminada", "Exitosa")
          this.getCategories();
          break;
        case 2:
          this.servicioNotificacion.showNotification("Se produjo un error al eliminar la categoria", "Error")
          break;
       }
    });
  }

  buscar(termino: string) {
    if (termino.length === 0) {
      return this.getCategories();
    }

    this.categoryService.getCategoryById(termino)
      .subscribe({
        next: (resp) => {
          this.processCategoriesResponse(resp);
        }
      })
  }

}
