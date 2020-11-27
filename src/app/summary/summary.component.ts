import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html'
})
export class SummaryComponent implements OnInit {

  public date: Date = new Date;
  displayedColumns: string[] = ['date', 'site', 'quantity', 'distributed'];
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
            id: element.payload.doc.id,
            date: date,
            site: data['site'],
            quantity: data['quantity'],
            distributed: data['distributed']
          });
        }
      });
  });
}
}
