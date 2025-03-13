import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private http: HttpClient) { }

  getCategories() {
    return this.http.get('https://labosbaza-default-rtdb.europe-west1.firebasedatabase.app/categories.json')
  }

  postCategory(category: any) {
    return this.http.post('https://labosbaza-default-rtdb.europe-west1.firebasedatabase.app/categories.json', category)
  }

  deleteCategory(key: any) {
    return this.http.delete(`https://labosbaza-default-rtdb.europe-west1.firebasedatabase.app/categories/${key}.json`)
  }
}

export interface Category {
  name: string;
}
