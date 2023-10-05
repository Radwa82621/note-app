import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(notes: any[], term: string): any[] {
    console.log(notes, term);

    return notes.filter((note) =>
      note.title.toLowerCase().includes(term.toLowerCase())
    );
  }
}
