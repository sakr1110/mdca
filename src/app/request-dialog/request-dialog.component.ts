import { Component, Inject, OnInit } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-request-dialog',
  templateUrl: './request-dialog.component.html'
})
export class RequestDialogComponent implements OnInit {

  public update = {
    action: 'update',
    qty: this.data.quantity
  }

  public assign = {
    action: 'assign',
    qty: this.data.quantity
  }

  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  onChange(_event) {
    this.assign = {
      action: 'assign',
      qty: _event
    };
    this.update = {
      action: 'update',
      qty: _event
    }
  }

}
