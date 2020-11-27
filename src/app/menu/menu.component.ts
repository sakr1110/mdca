import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit {
  @Input() type: string;
  @Output() selected_link = new EventEmitter();
  constructor(private router: Router) { }

  ngOnInit() {
  }
  
  Select(_selected_link) {
    this.selected_link.emit(_selected_link);
  }

  LogOut() {
    this.router.navigate(['/login']);
  }
}
