import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const base_url = "http://localhost:8080/api/v1";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private readonly http = inject(HttpClient);

  constructor() { }

  getCategories() {
    const endpoint = `${base_url}/categories`;
    return this.http.get(endpoint);
  }

  saveCategory(body: any) {
    const endpoint = `${base_url}/categories`;
    return this.http.post(endpoint, body);
  }

  updateCategory(body: any, id: number) {
    const endpoint = `${base_url}/categories/${id}`;
    return this.http.put(endpoint, body);
  }

  deleteCategory(id: number) {
    const endpoint = `${base_url}/categories/${id}`;
    return this.http.delete(endpoint);
  }

  getCategoryById(id: string) {
    const endpoint = `${base_url}/categories/${id}`;
    return this.http.get(endpoint);
  }

  exportCategories(): Observable<Blob> {
    const endpoint = `${base_url}/categories/export/excel`;
    return this.http.get(endpoint, {
      responseType: 'blob'
    });
  }
}
