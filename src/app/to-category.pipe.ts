import { Pipe, PipeTransform } from '@angular/core';
import {Category} from './category.service';

@Pipe({
  name: 'toCategory',
  standalone: false
})
export class ToCategoryPipe implements PipeTransform {

  transform(value: unknown): Category {
    return value as Category;
  }

}
