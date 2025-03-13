import { Pipe, PipeTransform } from '@angular/core';
import {Comment} from './comment.service';

@Pipe({
  name: 'toComment',
  standalone: false
})
export class ToCommentPipe implements PipeTransform {

  transform(value: unknown): Comment {
    return value as Comment;
  }

}
