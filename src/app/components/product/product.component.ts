import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  proDetail:any;
  pods:any;
  constructor() { }
  carts:any =[]
  ngOnInit(): void {
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
    let addcartJson = JSON.stringify(this.carts)
    sessionStorage.setItem('cart',addcartJson)
    Swal.fire({
      text: "thêm giỏ hàng thành công",
      icon: 'success',
      
    })
  }
  Showproductdetail(prod :any){
    this.proDetail=prod
  }
}
