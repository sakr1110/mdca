import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { RequestDialogComponent } from '../request-dialog/request-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-view-requests',
  templateUrl: './view-requests.component.html'
})
export class ViewRequestsComponent implements OnInit {
  public date: Date = new Date;
  public site: String = "";
  public id: String;
  displayedColumns: string[] = ['select', 'date', 'site', 'quantity', 'username'];
  dataSource = [];
  constructor(private firestore: AngularFirestore, public dialog: MatDialog, private router: Router, private rout: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.rout.snapshot.params['id'];
  }

  SelectRequest(_row) {
    if (_row.distributed == false) {
      let warehouse_id = null;
      let warehouse_total = null;
      let dist_total = null;
      const dialogRef = this.dialog.open(RequestDialogComponent, {
        width: '600px',
        data: _row
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result.action == "update") {
          this.firestore
            .collection("request")
            .doc(_row.id)
            .set({ quantity: Number(result.qty) }, { merge: true });
          setTimeout(function () {
            location.reload();
          }, 1000);
        } else if (result.action == "assign") {
          this.firestore
            .collection("request")
            .doc(_row.id)
            .set({ quantity: Number(result.qty), distributed: true }, { merge: true });
          this.firestore.collection("warehouse").get().subscribe((result1) => {
            result1.docs.forEach(element => {
              if (element.data()['site'] == _row.site) {
                warehouse_id = element.id;
                warehouse_total = element.data()['quantity'] - Number(result.qty);
                dist_total = element.data()['distributed'] + Number(result.qty);
                this.firestore
                  .collection("warehouse")
                  .doc(warehouse_id)
                  .set({ quantity: warehouse_total, distributed: dist_total }, { merge: true });
                setTimeout(function () {
                  location.reload();
                }, 1000);
              }
            });
          })
        }
      });

    }
  }

  View() {
    let date = this.date.toString();
    let site = this.site;
    this.dataSource = [];
    this.firestore.collection("request").snapshotChanges().subscribe(result => {
      result.forEach(element => {
        let data = element.payload.doc.data();
        if (site != "") {
          if (data['date'] == date && data['site'] == site) {
            this.dataSource.push({
              id: element.payload.doc.id,
              date: date,
              site: data['site'],
              quantity: data['quantity'],
              username: data['username'],
              distributed: data['distributed']
            });
          }
        } else {
          if (data['date'] == date) {
            this.dataSource.push({
              id: element.payload.doc.id,
              date: date,
              site: data['site'],
              quantity: data['quantity'],
              username: data['username'],
              distributed: data['distributed']
            });
          }
        }
      });
    });
  }

}
