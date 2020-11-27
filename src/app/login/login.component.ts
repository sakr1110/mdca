import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  username: string = "";
  password: string = "";
  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {
  }

  Login() {
    this.loginService.ValidateUser().subscribe(result => {
      if (result.length > 0) {
        result.forEach(element => {
          let user = element.payload.doc;
          if (user.data()['username'] == this.username && user.data()['password'] == this.password) {
            if (user.data()['role'] == "admin") {
              this.router.navigate(['/admin/' + user.id])
            } else {
              this.router.navigate(['/distributor/' + user.id])
            }
          }
        });
      }
    });
  }
}
