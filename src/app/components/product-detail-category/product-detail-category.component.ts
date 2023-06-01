import { query } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/services/app.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-product-detail-category',
  templateUrl: './product-detail-category.component.html',
  styleUrls: ['./product-detail-category.component.css']
})
export class ProductDetailCategoryComponent implements OnInit {
  id :any ;
  account : any;
  cates:any =[];
  prods:any = [];
  proDetail:any;
  proNew:any=[];
  proSale:any=[];
  carts:any =this.appService.getCart();
  constructor(private appService:AppService, private activedRouter: ActivatedRoute ) { }
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
    this.appService.getCategories().subscribe((res:any) => {
      this.cates = res.result
    })
    this.appService.getProducts().subscribe((res:any) => {
      this.prods = res.result
    })
    this.activedRouter.paramMap.subscribe((query :any) => {
     this.id =query.get('id');
     this.appService.getProductsByCategory(this.id).subscribe((res:any) => {
       this.prods = res.result
     })
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
