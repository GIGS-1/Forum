import {Component, inject} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../user.service';
import {HttpClient} from '@angular/common/http';
import {Category, CategoryService} from '../category.service';
import {Thread, ThreadService} from '../thread.service';
import {LikeService} from '../like.service';

@Component({
  selector: 'app-category',
  standalone: false,
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {
  constructor(private threadService: ThreadService, private likeService: LikeService, private categoryService: CategoryService, private router: Router) {}

  private readonly route = inject(ActivatedRoute)

  username = sessionStorage.getItem('username');
  userId = sessionStorage.getItem('userId');

  catId: any;
  categoryName: any;

  categories: Category[] = [];
  keys: string[] = [];

  threads: any;
  threadsAll: Thread[] = [];

  ngOnInit() {
    this.catId = this.route.snapshot.paramMap.get('id');
    this.categoryService.getCategories().subscribe(data => {
      this.keys = Object.keys(data);
      this.categories = Object.values(data);
      this.categoryName = this.categories[this.keys.indexOf(this.catId)].name;
    })

    this.threadService.getThreads().subscribe(data => {
      this.threads = data;

      this.likeService.getLikes().subscribe(data => {
        let likes = Object.values(data);

        for (let i = 0; i < Object.values(this.threads).length; i++) {
          // @ts-ignore
          if (Object.values(this.threads)[i].categoryId == this.catId) {
            let count = 0;
            for (let j = 0; j < likes.length; j++) {
              if (Object.keys(this.threads)[i] == likes[j].contentId) {
                count++;
              }
            }
            (<HTMLInputElement>document.getElementById(Object.keys(this.threads)[i] + "_likeCount")).innerHTML = count.toString();
          }
        }
      })
    })
  }

  logOut() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}
