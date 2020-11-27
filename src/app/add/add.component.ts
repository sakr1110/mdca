import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../snackbar/snackbar.component';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html'
})
export class AddComponent implements OnInit {
  public username: string = "";
  public password: string = "";
  public site: string = "";
  constructor(private firestore: AngularFirestore, private _snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  Add() {
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection("users")
        .add({
          username: this.username,
          password: this.password,
          site: this.site,
          role: 'distributor'
        })
        .then(res => {
          this._snackBar.openFromComponent(SnackbarComponent, {
            duration: 5 * 1000,
          });
        }, err => reject(err));
    });
  }
}
