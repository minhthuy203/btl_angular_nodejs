import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-product-cart',
  templateUrl: './product-cart.component.html',
  styleUrls: ['./product-cart.component.css']
})
export class ProductCartComponent implements OnInit {
  carts:any =[];
  constructor(private appService:AppService) { }

  ngOnInit(): void {
this.carts = this.appService.getCart()
  }
  subtotal(cart:any){
    return cart.quantity*cart.price
  }
  udQtt(i:number, event:any){
    let newQuantity= event.target.value;
    newQuantity = newQuantity >0? newQuantity :1;
    event.target.value=newQuantity
    this.carts[i].quantity = newQuantity;
  
    
  }
  removeCart(idx: number) {
    let _this = this;
    Swal.fire({
      title: 'Bạn có chắc không',
      text: "OK sẽ xóa",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ok xóa'
    }).then(function (isConfirm: any) {
      if (isConfirm.isConfirmed) {
        Swal.fire(
          'Đã xóa',
          'Xóa sản phẩm khỏi giỏ hàng',
          'success'
        );
        _this.carts.splice(idx, 1);
        _this.appService.saveCart(_this.carts);
      }
    })
  }
  // clearCart(){
  //   let _this = this;
  //   Swal.fire({
  //     title: 'Bạn có chắc không',
  //     text: "OK sẽ xóa",
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#3085d6',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: 'Ok xóa'
  //   }).then(function (isConfirm: any) {
  //     if (isConfirm.isConfirmed) {
  //       Swal.fire(
  //         'Đã xóa',
  //         'Xóa sản phẩm khỏi giỏ hàng',
  //         'success'
  //       );
  //       sessionStorage.removeItem('cart');
  //       _this.carts =[]
  //     }
  //   })
  // }
}
