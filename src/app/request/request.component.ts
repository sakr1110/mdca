import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../snackbar/snackbar.component';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html'
})
export class RequestComponent implements OnInit {
  public id: string;
  public site: string;
  public username: string;
  public quantity: Number = 0;
  public date: Date = new Date();

  constructor(private firestore: AngularFirestore, private router: ActivatedRoute,private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.id = this.router.snapshot.params['id'];
    this.firestore.collection("users").snapshotChanges().subscribe(result => {
      result.forEach(element => {
        if(element.payload.doc.id == this.id) {
          this.site = element.payload.doc.data()['site'];
          this.username = element.payload.doc.data()['username'];
        }
      });
    })
  }

  Request() {
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection("request")
        .add({
          quantity: this.quantity,
          date: this.date,
          site: this.site,
          username: this.username,
          distributed: false
        })
        .then(res => {
          this._snackBar.openFromComponent(SnackbarComponent, {
          duration: 5 * 1000,
        });
        }, err => reject(err));
    });
  }
}