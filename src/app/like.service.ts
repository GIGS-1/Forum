import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LikeService {
  constructor(private http: HttpClient) { }

  getLikes() {
    return this.http.get('https://labosbaza-default-rtdb.europe-west1.firebasedatabase.app/likes.json')
  }

  postLike(like: any) {
    return this.http.post('https://labosbaza-default-rtdb.europe-west1.firebasedatabase.app/likes.json', like)
  }

  deleteLike(key: any) {
    return this.http.delete(`https://labosbaza-default-rtdb.europe-west1.firebasedatabase.app/likes/${key}.json`)
  }
}

export interface Like {
  userId: string;
  contentId: string;
}
