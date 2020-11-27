import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html'
})
export class AdminPageComponent implements OnInit {
  public show_add: boolean = true;
  public show_add_site: boolean = false;
  public show_summary: boolean = false;
  public view_requests: boolean = false;
  constructor() { }

  ngOnInit() {
  }
  
  Select(_event) {
    this.show_add = false;
    this.show_add_site = false;
    this.show_summary = false;
    this.view_requests = false;
    if (_event == 'add') {
      this.show_add = true;
    } else if (_event == 'site') {
      this.show_add_site = true;
    } else if (_event == 'viewrequests') {
      this.view_requests = true;
    } else {
      this.show_summary = true;
    }
  }
}
