import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ThreadService {
  constructor(private http: HttpClient) { }

  getThreads() {
    return this.http.get('https://labosbaza-default-rtdb.europe-west1.firebasedatabase.app/threads.json')
  }

  postThread(thread: any) {
    return this.http.post('https://labosbaza-default-rtdb.europe-west1.firebasedatabase.app/threads.json', thread)
  }

  deleteThread(key: any) {
    return this.http.delete(`https://labosbaza-default-rtdb.europe-west1.firebasedatabase.app/threads/${key}.json`)
  }

  editThread(key: any, thread: any) {
    return this.http.patch(`https://labosbaza-default-rtdb.europe-west1.firebasedatabase.app/threads/${key}.json`, thread)
  }
}

export interface Thread {
  name: string;
  date: string;
  content: string;
  userId: string;
  categoryId: string;
}
