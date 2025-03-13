import {Component, inject} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ThreadService} from '../thread.service';
import {LikeService} from '../like.service';
import {CommentService} from '../comment.service';
import {User, UserService} from '../user.service';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  constructor(private threadService: ThreadService, private likeService: LikeService, private userService: UserService, private commentService: CommentService, private router: Router) {}

  private readonly route = inject(ActivatedRoute)

  threads: any;

  userId = sessionStorage.getItem('userId');
  username = sessionStorage.getItem('username');
  user: any;

  comments: any;

  ngOnInit() {
    this.userService.getUserById(this.userId).subscribe(data => {
      this.user = data;
    })

    this.threadService.getThreads().subscribe(data => {
      this.threads = data;

      this.likeService.getLikes().subscribe(data => {
        let likes = Object.values(data);

        for (let i = 0; i < Object.values(this.threads).length; i++) {
          // @ts-ignore
          if (Object.values(this.threads)[i].userId == this.userId) {
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

    this.commentService.getComments().subscribe(data => {
      this.comments = data;

      this.likeService.getLikes().subscribe(data => {
        let likes = Object.values(data);

        for (let i = 0; i < Object.values(this.comments).length; i++) {
          // @ts-ignore
          if (Object.values(this.comments)[i].userId == this.userId) {
            let count = 0;
            for (let j = 0; j < likes.length; j++) {
              if (Object.keys(this.comments)[i] == likes[j].contentId) {
                count++;
              }
            }
            (<HTMLInputElement>document.getElementById(Object.keys(this.comments)[i] + "_likeCount")).innerHTML = count.toString();
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
