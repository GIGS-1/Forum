import { Pipe, PipeTransform } from '@angular/core';
import {Comment} from './comment.service';
import {User} from './user.service';

@Pipe({
  name: 'toUser',
  standalone: false
})
export class ToUserPipe implements PipeTransform {

  transform(value: unknown): User {
    return value as User;
  }

}
