import { DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, Inject, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { NoteService } from 'src/app/core/services/note.service';
import { LoginComponent } from '../login/login.component';
@Component({
  selector: 'app-note-data',
  templateUrl: './note-data.component.html',
  styleUrls: ['./note-data.component.css'],
})
export class NoteDataComponent implements OnInit {
  constructor(
    private _FormBuilder: FormBuilder,
    private _NoteService: NoteService,
    private _MatDialogRef: MatDialogRef<NoteDataComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  dataForm!: FormGroup;
  ngOnInit(): void {
    this.createForm();
    console.log(this.data);
  }
  createForm() {
    this.dataForm = this._FormBuilder.group({
      title: [this.data ? this.data.note.title : '', [Validators.required]],
      content: [this.data ? this.data.note.content : '', [Validators.required]],
    });
  }

  sendData() {
    if (this.dataForm.valid) {
      if (this.data) {
        this.update();
      } else {
        this.add();
      }
    } else {
      console.log('invalid');
    }
  }
  add() {
    this._NoteService.addNote(this.dataForm.value).subscribe({
      next: (res) => {
        console.log(res);
        if (res.msg == 'done') {
          this._MatDialogRef.close('add');
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  update() {
    this._NoteService.UpdateNote(this.data, this.dataForm.value).subscribe({
      next: (res) => {
        console.log(res);
        if (res.msg == 'done') {
          this._MatDialogRef.close('update');
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
