import {Component, inject} from '@angular/core';
import {DatePipe} from '@angular/common';
import {CommentService} from '../comment.service';
import {UserService} from '../user.service';
import {Thread, ThreadService} from '../thread.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-create-thread',
  standalone: false,
  templateUrl: './create-thread.component.html',
  styleUrl: './create-thread.component.css'
})
export class CreateThreadComponent {
  constructor(public datepipe: DatePipe, private commentService: CommentService, private userService: UserService, private threadService: ThreadService, private router: Router) {}

  private readonly route = inject(ActivatedRoute)

  userId = sessionStorage.getItem('userId');
  username = sessionStorage.getItem('username');

  categoryId: any;

  threadId: any;
  thread: any;
  threads: Thread[] = [];

  keys: string[] = [];

  ngOnInit() {
    this.categoryId = this.route.snapshot.paramMap.get('id');
  }

  getCurDatetime() {
    return this.datepipe.transform((new Date), 'MM/dd/yyyy h:mm:ss');
  }

  saveThread(thread: any) {
    this.threadService.postThread(thread).subscribe(data => {
      this.router.navigate(['/thread', Object.values(data)[0]]);
    });
  }

  logOut() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}
