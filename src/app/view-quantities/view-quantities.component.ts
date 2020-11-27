import { Component, OnInit } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-view-quantities',
  templateUrl: './view-quantities.component.html'
})
export class ViewQuantitiesComponent implements OnInit {
  public date: Date = new Date;
  displayedColumns: string[] = ['date','site','quantity'];
  dataSource = [];
  constructor(private firestore: AngularFirestore) { }

  ngOnInit() {
  }

  View() {
    let date = this.date.toString();
    this.dataSource = [];
    this.firestore.collection("warehouse").snapshotChanges().subscribe(result => {
      result.forEach(element => {
        let data = element.payload.doc.data();
        if (data['date'] == date) {
          this.dataSource.push({
            date: date,
            site: data['site'],
            quantity: data['quantity']
          });
        }
      });
    });
  }
}
