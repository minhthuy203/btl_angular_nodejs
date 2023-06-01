import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css',"./bootstrap.min.css", "./style.min.css"]
})
export class WishlistComponent implements OnInit {
  favourites: any;
  carts:any =this.appService.getCart();
  constructor(private appService: AppService) { }
  getAllFavourites(){
    this.appService.getfavorites(this.appService.getAccount().id).subscribe((res:any)=>{
      this.favourites = res.result
       
     })
  }
  ngOnInit(): void {
    this.getAllFavourites()
  }
  removeFavourite(id:any) {
    this.appService.removeFavourite(this.appService.getAccount().id,id).subscribe((res:any)=>{
      Swal.fire({
        text: res.result,
        icon: 'success',
      })
      this.getAllFavourites()
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
    let addcartJson = JSON.stringify(this.carts)
    sessionStorage.setItem('cart',addcartJson)
    Swal.fire({
      text: "thêm giỏ hàng thành công",
      icon: 'success',
      
    })
  }
}
