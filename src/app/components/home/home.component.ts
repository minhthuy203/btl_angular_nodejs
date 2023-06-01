import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppService } from 'src/app/services/app.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  cates:any =[];
  carts:any =this.appService.getCart();
  prods:any = [];
  proDetail:any;
  account : any;
  proNew:any=[];
  proSale:any=[];

  constructor(private appService:AppService) { }
  errors : string ="";
  formLogin : FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required) // yêu cầu phải nhập
  })
  get f(){
    return this.formLogin.controls //trả về các control ở html để hiện validator
  }
  getProd(){
    this.appService.getProducts().subscribe((res:any) => {
      let prd = res.result.map((item:any)=>{
        this.appService.checkFavorite(this.account.id, item.id).subscribe((res:any) => {
          item.isFavorite = res.result;
        });
        return item;
      })
      console.log()
      this.prods = res.result
    })
  }
  ngOnInit(): void {
    this.account = this.appService.getAccount()
    this.appService.getCategories().subscribe((res:any) => {
      this.cates = res.result
      
    })
    this.appService.getProductsNew().subscribe((res:any) => {
      this.proNew = res.result
      
    })
 
    this.appService.getProductsSale().subscribe((res:any) => {
      this.proSale = res.result
      
    })
 
    this.getProd();
    
  }
  Showproductdetail(prod :any){
    this.proDetail=prod
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
  addCart(prod:any){
    let index = this.carts.findIndex((item:any)=> {
      return item.id === prod.id  
    })
    if(index > 0){
      this.carts[index].quantity += 1
    }
    else{ 
      let cartItem= {     
        id:prod.id,
        name:prod.name,
        image:prod.image,
        price:prod.sale_price? prod.sale_price :prod.price,
        quantity:1
      }
      this.carts.push(cartItem);
    }
    // JSON stringify
    this.appService.saveCart(this.carts)
    Swal.fire({
      text: "thêm giỏ hàng thành công",
      icon: 'success',
      
    })
  }
  // yêu thich
  addFavorites(id: number) {
    let acc = this.appService.getAccount()
    let data={
      account_id: this.account.id,
      product_id:id
    }
    this.appService.addfavorites(data).subscribe((res:any) => {
      this.getProd();
      Swal.fire({
        text: res.result,
        icon: 'success',
        
      })
    })

  }
  
}
