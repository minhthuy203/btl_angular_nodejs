import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from 'src/app/services/app.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-account-login',
  templateUrl: './account-login.component.html',
  styleUrls: ['./account-login.component.css']
})
export class AccountLoginComponent implements OnInit {
  errors : string ="";
  formLogin : FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required) // yêu cầu phải nhập
  })
  constructor( private appService: AppService, private router: Router) { }
  ngOnInit(): void {
  }


  get f(){
    return this.formLogin.controls //trả về các control ở html để hiện validator
  }
  submitLogin(){
    if (this.formLogin.invalid){ return; }                        // invalid là bắt lỗi nếu có lỗi thì bị chặn lại ngc lại sẽ pass
    this.appService.checkLogin(this.formLogin.value).subscribe((res: any) => {
      if (res.result) {
        sessionStorage.setItem("login", JSON.stringify(res.result));
        // this.router.navigate(['/'])
        location.assign('/');
      }
      else{
        Swal.fire({
          text: "tài khoản không hợp lệ",
          icon: 'warning',
          
        })
      }
    })
  }
}
