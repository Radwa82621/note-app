import { Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { NoteDataComponent } from '../note-data/note-data.component';
import jwtDecode from 'jwt-decode';
import { NoteService } from 'src/app/core/services/note.service';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
export interface User {
  email: string;
  exp: number;
  iat: number;
  id: string;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  @ViewChild('deleteSwal')
  public readonly deleteSwal!: SwalComponent;

  userId!: string;
  value: string = '';

  userData = {} as User;
  userNotes: any[] = [];
  constructor(public dialog: MatDialog, private _NoteService: NoteService) {
    console.log(jwtDecode(JSON.stringify(localStorage.getItem('userToken'))));
    this.userData = jwtDecode(
      JSON.stringify(localStorage.getItem('userToken'))
    );
    this.userId = this.userData.id;
    this.userNotes = [];

    this.getNotes();
  }

  openDialog() {
    const dialogRef = this.dialog.open(NoteDataComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      if (result == 'add') {
        this.getNotes();
      }
    });
  }

  getNotes() {
    this._NoteService.getNotes().subscribe({
      next: (res) => {
        this.userNotes = [];
        res.notes.forEach((element: any) => {
          if (element.createdBy == this.userId) {
            this.userNotes.push(element);
          }
        });
        console.log(this.userNotes);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  deleteFile(id: string) {
    console.log(id);
    this._NoteService.deleteNote(id).subscribe({
      next: (res) => {
        console.log(res);
        this.getNotes();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  setData(note: any) {
    console.log(note);

    const dialogRef = this.dialog.open(NoteDataComponent, { data: { note } });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      if (result == 'update') {
        console.log('updated');

        this.getNotes();
      }
    });
  }
}
