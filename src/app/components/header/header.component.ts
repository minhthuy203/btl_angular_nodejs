import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {  
  account : any;
  // isLogin:boolean = false;
  constructor(private router: Router,private appService: AppService) { }

  ngOnInit(): void {
    this.account = this.appService.getAccount();
  }
  logout(){
    sessionStorage.clear();
    this.router.navigate(['/'])
  }
}
