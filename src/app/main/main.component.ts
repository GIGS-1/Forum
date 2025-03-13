import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {User, UserService} from '../user.service';
import {Category, CategoryService} from '../category.service';
import {Thread, ThreadService} from '../thread.service';
import {catchError} from 'rxjs';

@Component({
  selector: 'app-main',
  standalone: false,
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  constructor(private categoryService: CategoryService, private userService: UserService, private threadService: ThreadService, private router: Router) {}

  username = sessionStorage.getItem('username');
  userId = sessionStorage.getItem('userId');
  user: Object | undefined;

  categories: any;
  catCounts = new Map();

  ngOnInit() {
    if(sessionStorage.getItem('username') == undefined) {
      this.router.navigate(['/login']);
    }

    this.userService.getUserById(this.userId).subscribe(data => {
      this.user = data;
    })

    this.categoryService.getCategories().subscribe(data => {
      this.categories = data;

      let threads: Thread[] = [];
      this.threadService.getThreads().subscribe(data1 => {
        threads = Object.values(data1);

        Object.keys(data).forEach(key => {
          let count = threads.filter(thread => { return thread.categoryId == key; }).length;
          this.catCounts.set(key, count);
        })
      })
    })
  }

  send(category: any) {
    this.categoryService.postCategory(category).subscribe(data => {
      this.showAddCategoryWindow()
      this.ngOnInit();
    });
  }

  logOut() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  showAddCategoryWindow() {
    if ((<HTMLInputElement>document.getElementById("addCategoryDiv")).style.display == 'none'){
      (<HTMLInputElement>document.getElementById("addCategoryDiv")).style.display = 'inline';
      (<HTMLInputElement>document.getElementById("catButton")).innerHTML = 'Close';
    }
    else {
      (<HTMLInputElement>document.getElementById("addCategoryDiv")).style.display = 'none';
      (<HTMLInputElement>document.getElementById("catButton")).innerHTML = 'Add Category';
    }
  }

  deleteCategory(key: any) {
    this.categoryService.deleteCategory(key).subscribe(data => {
      this.ngOnInit();
    });
  }
}
