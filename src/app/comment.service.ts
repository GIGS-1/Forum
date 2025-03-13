import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  constructor(private http: HttpClient) { }

  getComments() {
    return this.http.get('https://labosbaza-default-rtdb.europe-west1.firebasedatabase.app/comments.json')
  }

  postComment(comment: any) {
    return this.http.post('https://labosbaza-default-rtdb.europe-west1.firebasedatabase.app/comments.json', comment)
  }

  deleteComment(key: any) {
    return this.http.delete(`https://labosbaza-default-rtdb.europe-west1.firebasedatabase.app/comments/${key}.json`)
  }

  editComment(key: any, comment: any) {
    return this.http.patch(`https://labosbaza-default-rtdb.europe-west1.firebasedatabase.app/comments/${key}.json`, comment)
  }
}

export interface Comment {
  date: string;
  content: string;
  userId: string;
  threadId: string;
}
