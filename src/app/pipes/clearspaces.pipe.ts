import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'clearspaces'
})
export class ClearspacesPipe implements PipeTransform {

  transform(value: string): string {
    return value.replace(/\s/g, "");
  }

}
