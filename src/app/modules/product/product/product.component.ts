import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { NgIf } from '@angular/common';

import { ProductElement } from '../../shared/models/product.model';
import { ProductService } from '../../shared/services/product.service';
import { NewProductComponent } from '../new-product/new-product.component';
import { NotificationServiceService } from '../../shared/services/notification-service.service';
import { ConfirmComponent } from '../../shared/components/confirm/confirm.component';
import { UtilService } from '../../shared/services/util.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatTableModule, MatIconModule, MatPaginator],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {
  private readonly productService = inject(ProductService);
  readonly dialog = inject(MatDialog)
  readonly servicioNotificacion = inject(NotificationServiceService);

  private readonly utilService = inject(UtilService);
  isAdmin: any;

  displayedColumns: string[] = ['id', 'name', 'price', 'quantity', 'category', 'picture', 'actions'];
  dataSource = new MatTableDataSource<ProductElement>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngOnInit(): void {
    this.getProducts();
    this.isAdmin = this.utilService.isAdmin();
  }

  getProducts() {
    this.productService.getProducts()
      .subscribe({
        next: (products: any) => {
          this.processProductsResponse(products);
        },
        error: (error) => {
          console.error(error);
        }
      });
  }

  processProductsResponse(resp: any) {
    const dataProduct: ProductElement[] = [];
    if (resp.metadata[0].code === "00") {
      let listProduct = resp.product.products;
      listProduct.forEach((element: ProductElement) => {
        element.picture = element.picture === null ? "assets/images/no-image.png" : 'data:image/jpeg;base64,' + element.picture;
        dataProduct.push(element);
      });

      this.dataSource = new MatTableDataSource<ProductElement>(dataProduct);
      this.dataSource.paginator = this.paginator;
    }
  }

  openProductDialog() {
    const dialogRef = this.dialog.open(NewProductComponent, {
            width: "450px"
          });

          dialogRef.afterClosed().subscribe(result => {
            switch (result) {
              case 1:
                this.servicioNotificacion.showNotification("Producto Agregado", "Exitosa")
                this.getProducts();
                break;
              case 2:
                this.servicioNotificacion.showNotification("Se produjo un error al guardar el producto", "Error")
                break;
             }
          });
  }

  edit(element: ProductElement) {
    const dialogRef = this.dialog.open(NewProductComponent, {
      width: "450px",
      data: {
        id: element.id,
        name: element.name,
        price: element.price,
        quantity: element.quantity,
        category: element.category,
        picture: element.picture
      }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      switch (result) {
        case 1:
          this.servicioNotificacion.showNotification("Producto Editado", "Exitosa")
          this.getProducts();
          break;
        case 2:
          this.servicioNotificacion.showNotification("Se produjo un error al editar el producto", "Error")
          break;
      }
    })

  }

  delete(id: number) {
      const dialogRef = this.dialog.open(ConfirmComponent, {
      width: "450px",
      data: {
        id: id,
        module: "product",
        title: "Eliminar Producto",
      }
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      switch (result) {
        case 1:
          this.servicioNotificacion.showNotification("Producto eliminado", "Exitosa")
          this.getProducts();
          break;
        case 2:
          this.servicioNotificacion.showNotification("Se produjo un error al eliminar el producto", "Error")
          break;
      }
    })
  }

  applyFilter(name: string) {
      if (name.length === 0) {
        return this.getProducts();
      }

      this.productService.getProductByName(name)
      .subscribe({
        next: (products: any) => {
          this.processProductsResponse(products);
        },
        error: (error: any) => {
          console.error(error);
        }
      });

    }


}
