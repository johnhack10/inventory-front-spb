import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

const base_url = "http://localhost:8080/api/v1";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private readonly htt = inject(HttpClient);

  constructor() { }

  getCategories() {
    const endpoint = `${base_url}/categories`;
    return this.htt.get(endpoint);
  }

  saveCategory(body: any) {
    const endpoint = `${base_url}/categories`;
    return this.htt.post(endpoint, body);
  }

  updateCategory(body: any, id: number) {
    const endpoint = `${base_url}/categories/${id}`;
    return this.htt.put(endpoint, body);
  }

  deleteCategory(id: number) {
    const endpoint = `${base_url}/categories/${id}`;
    return this.htt.delete(endpoint);
  }
}
