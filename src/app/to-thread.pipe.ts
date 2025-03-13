import { Pipe, PipeTransform } from '@angular/core';
import {Category} from './category.service';
import {Thread} from './thread.service';

@Pipe({
  name: 'toThread',
  standalone: false
})
export class ToThreadPipe implements PipeTransform {

  transform(value: unknown): Thread {
    return value as Thread;
  }

}
