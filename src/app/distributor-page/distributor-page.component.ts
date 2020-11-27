import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-distributor-page',
  templateUrl: './distributor-page.component.html'
})
export class DistributorPageComponent implements OnInit {
  public show_request: boolean = true;
  public view_qtty: boolean = false;
  constructor() { }

  ngOnInit() {
  }

  Select(_event) {
    this.show_request = false;
    this.view_qtty = false;
    if (_event == 'request') {
      this.show_request = true;
    } else {
      this.view_qtty = true;
    }
  }
}
