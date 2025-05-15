import { Component, inject, OnInit } from '@angular/core';

import { ProductService } from '../../../shared/services/product.service';
import { ProductElement } from '../../../shared/models/product.model';
import { ArcElement, BarController, BarElement, CategoryScale, Chart, Colors, DoughnutController, Legend, LinearScale, Tooltip } from 'chart.js';

Chart.register(BarController, DoughnutController, Tooltip, ArcElement, BarElement, CategoryScale, LinearScale, Legend, Colors);


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit  {
  private readonly productService = inject(ProductService);

  chartBar: any;
  chartDoughnut: any;

  ngOnInit(): void {
    this.getProducts();
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

      const nameProduct: string[] = [];
      const account: number[] = [];

      if (resp.metadata[0].code === "00") {
        let listProduct = resp.product.products;
        listProduct.forEach((element: ProductElement) => {
          nameProduct.push(element.name);
          account.push(element.quantity);
        });

        this.chartBar = new Chart("canvas-bar", {
          type: 'bar',
          data: {
            labels: nameProduct,
            datasets: [
              {
                label: 'Productos', data: account,
              }
            ]
          },
        });

        this.chartDoughnut = new Chart("canvas-doughnut", {
          type: 'doughnut',
          data: {
            labels: nameProduct,
            datasets: [
              {
                label: 'Productos', data: account,
              }
            ]
          },
        });
      }
    }



}
