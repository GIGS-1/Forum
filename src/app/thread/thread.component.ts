import {Component, inject} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Comment, CommentService} from '../comment.service';
import {Thread, ThreadService} from '../thread.service';
import {DatePipe} from '@angular/common';
import {UserService} from '../user.service';
import {Like, LikeService} from '../like.service';

@Component({
  selector: 'app-thread',
  standalone: false,
  templateUrl: './thread.component.html',
  styleUrl: './thread.component.css'
})
export class ThreadComponent {
  constructor(public datepipe: DatePipe, private commentService: CommentService, private likeService: LikeService, private userService: UserService, private threadService: ThreadService, private router: Router) {}

  private readonly route = inject(ActivatedRoute)

  userId = sessionStorage.getItem('userId');
  username: any;

  threadId: any;
  thread: any;
  threadUser: any;

  threads: Thread[] = [];
  keys: string[] = [];

  comments: any;

  ngOnInit() {
    this.threadId = this.route.snapshot.paramMap.get('id');

    this.threadService.getThreads().subscribe(data => {
      this.keys = Object.keys(data);
      this.threads = Object.values(data);
      this.thread = this.threads[this.keys.indexOf(this.threadId)];
      this.userService.getUserById(this.threads[this.keys.indexOf(this.threadId)].userId).subscribe(data => {
        this.threadUser = Object.values(data)[Object.keys(data).indexOf("username")];
      })

      this.likeService.getLikes().subscribe(data => {
        let likes = Object.values(data);

        let count = 0;
        (<HTMLInputElement>document.getElementById(this.threadId + "_like")).innerHTML = '🩶';
        (<HTMLInputElement>document.getElementById(this.threadId + "_like1")).innerHTML = '🩶';
        for (let j = 0; j < likes.length; j++) {
          if (this.threadId == likes[j].contentId && likes[j].userId == this.userId) {
            (<HTMLInputElement>document.getElementById(this.threadId + "_like")).innerHTML = '❤️';
            (<HTMLInputElement>document.getElementById(this.threadId + "_like1")).innerHTML = '️️❤️';
          }
          if (this.threadId == likes[j].contentId) {
            count++;
          }
        }
        (<HTMLInputElement>document.getElementById(this.threadId + "_likeCount")).innerHTML = count.toString();
        (<HTMLInputElement>document.getElementById(this.threadId + "_likeCount1")).innerHTML = count.toString();
      })
    })

    this.userService.getUserById(this.userId).subscribe(data => {
      this.username = Object.values(data)[Object.keys(data).indexOf("username")];
    })

    this.commentService.getComments().subscribe(data => {
      this.comments = data;

      this.likeService.getLikes().subscribe(data1 => {
        let likes = Object.values(data1);

        for (let i = 0; i < Object.values(this.comments).length; i++) {
          // @ts-ignore
          if (Object.values(this.comments)[i].threadId == this.threadId) {
            // @ts-ignore
            this.userService.getUserById(Object.values(this.comments)[i].userId).subscribe(data2 => {
              (<HTMLInputElement>document.getElementById(Object.keys(this.comments)[i] + "_username")).innerHTML = Object.values(data2)[Object.keys(data2).indexOf("username")];
              (<HTMLInputElement>document.getElementById(Object.keys(this.comments)[i] + "_username1")).innerHTML = Object.values(data2)[Object.keys(data2).indexOf("username")];
            })

            let count = 0;
            (<HTMLInputElement>document.getElementById(Object.keys(this.comments)[i] + "_like")).innerHTML = '🩶';
            (<HTMLInputElement>document.getElementById(Object.keys(this.comments)[i] + "_like1")).innerHTML = '🩶';
            for (let j = 0; j < likes.length; j++) {
              if (Object.keys(this.comments)[i] == likes[j].contentId && likes[j].userId == this.userId) {
                (<HTMLInputElement>document.getElementById(Object.keys(this.comments)[i] + "_like")).innerHTML = '❤️';
                (<HTMLInputElement>document.getElementById(Object.keys(this.comments)[i] + "_like1")).innerHTML = '❤️';
              }
              if (Object.keys(this.comments)[i] == likes[j].contentId) {
                count++;
              }
            }
            (<HTMLInputElement>document.getElementById(Object.keys(this.comments)[i] + "_likeCount")).innerHTML = count.toString();
            (<HTMLInputElement>document.getElementById(Object.keys(this.comments)[i] + "_likeCount1")).innerHTML = count.toString();
          }
        }
      })
    })
  }

  send(comment: any) {
    this.commentService.postComment(comment).subscribe(data => {
      (<HTMLInputElement>document.getElementById("commentField")).value = '';
      this.ngOnInit()
    });
  }

  deleteComment(key: unknown) {
    this.commentService.deleteComment(key).subscribe(data => {
      this.ngOnInit()
    });
  }

  editComment(key:any, comment: any) {
    this.commentService.editComment(key, comment).subscribe(data => {
      this.ngOnInit()
      this.cancel(key);
    });
  }

  edit(key: unknown) {
    (<HTMLInputElement>document.getElementById(key + "_original")).style.display = 'none';
    (<HTMLInputElement>document.getElementById(key + "_form")).style.display = 'block';
  }

  cancel(key: unknown) {
    (<HTMLInputElement>document.getElementById(key + "_original")).style.display = 'block';
    (<HTMLInputElement>document.getElementById(key + "_form")).style.display = 'none';
  }

  protected readonly sessionStorage = sessionStorage;
  protected readonly Date = Date;

  getCurDatetime() {
    return this.datepipe.transform((new Date), 'MM/dd/yyyy h:mm:ss');
  }

  deleteThread() {
    this.threadService.deleteThread(this.threadId).subscribe(data => {
      this.router.navigate(['/category', this.thread.categoryId]);
    });
  }

  editThread(thread: any) {
    this.threadService.editThread(this.threadId, thread).subscribe(data => {
      this.ngOnInit()
      this.cancel(this.threadId);
    });
  }

  like(key: unknown) {
    if ((<HTMLInputElement>document.getElementById(key + "_like")).innerHTML == '🩶') {
      this.likeService.postLike({userId: this.userId, contentId: key} as Like).subscribe(data => {
        this.ngOnInit()
      });
    }
    else {
      this.likeService.getLikes().subscribe(data => {
        let keys = Object.keys(data);
        let likes = Object.values(data);

        for (let i = 0; i < likes.length; i++) {
          if (likes[i].userId == this.userId && likes[i].contentId == key) {
            this.likeService.deleteLike(keys[i]).subscribe(data => {
              this.ngOnInit()
            });
          }
        }
      })
    }
  }

  logOut() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}
