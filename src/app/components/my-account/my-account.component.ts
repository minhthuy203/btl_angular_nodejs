import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {
account:any
  constructor(private router: Router,private appService: AppService) { }

  ngOnInit(): void {
  this.account= this.appService.getAccount();
  }

  logout(){
    sessionStorage.clear();
    this.router.navigate(['/'])
  }
}
