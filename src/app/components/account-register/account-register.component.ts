import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-account-register',
  templateUrl: './account-register.component.html',
  styleUrls: ['./account-register.component.css']
})
export class AccountRegisterComponent implements OnInit {
  formRegister: FormGroup = new FormGroup({
    email:new FormControl('', [Validators.required, Validators.email, Validators.minLength(6)]),
    password:new FormControl('', [Validators.required, Validators.minLength(6)]),
    name:new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]),
  });

  error:any =''
  constructor(private appService : AppService) { }

  ngOnInit(): void {
  }
  get f(){
    return this.formRegister.controls //trả về các control ở html để hiện validator
  }
  submitRegister(){
    if(this.formRegister.invalid) {return;}
    this.appService.checkRegister(this.formRegister.value).subscribe((res:any) => {
      if(res.status== true) {
        location.assign('/login')
      }
      else{ 
        this.error=res.result 
      console.log(this.error)

      }
    })
  }
}
