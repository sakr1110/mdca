import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../snackbar/snackbar.component';

@Component({
  selector: 'app-add-warehouse',
  templateUrl: './add-warehouse.component.html'
})
export class AddWarehouseComponent implements OnInit {
  public quantity: number = 0;
  public date: Date = new Date;
  public site: string = "";


  constructor(private firestore: AngularFirestore, private _snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  Add() {
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection("warehouse")
        .add({
          quantity: this.quantity,
          date: this.date,
          site: this.site,
          distributed: 0
        })
        .then(res => {
          this._snackBar.openFromComponent(SnackbarComponent, {
            duration: 5 * 1000,
          });
        }, err => reject(err));
    });
  }
}
