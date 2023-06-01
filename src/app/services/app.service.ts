import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
const api = 'http://localhost:4000/api'
@Injectable({
  providedIn: 'root'
})
export class AppService {
// dependency injection
  constructor(private http: HttpClient) { }
// lấy danh sách 
  getCategories() { 
    return this.http.get(`${api}/category`)
  }
  getProducts() { 
    return this.http.get(`${api}/product`)
  }
  getProductsNew() { 
    return this.http.get(`${api}/prodNew`)
  }
  getProductsSale() { 
    return this.http.get(`${api}/prodSale`)
  }
  getProductsByCategory(id:number) { 
    return this.http.get(`${api}/product_by_category/${id}`)
  }
  getProductsDetail(id:number) { 
    return this.http.get(`${api}/product/${id}`)
  }

  checkLogin(data :any) {
    return this.http.post(`${api}/login`, data)
  }
  checkRegister(data :any) {
    return this.http.post(`${api}/register`, data)
  }
  addfavorites(data:any) {
    return this.http.post(`${api}/favorite`,data)
  }
  getfavorites(account_id : number) {
    return this.http.get(`${api}/favorite/${account_id}`)
  }
  removeFavourite(account_id : number,product_id : number) {
    return this.http.delete(`${api}/favorite/${account_id}/${product_id}`)
  }
  checkFavorite(account_id : number,product_id : number){
    return this.http.get(`${api}/favorite/${account_id}/${product_id}`)
  }
  getAccount(){
    let acc = sessionStorage.getItem('login');
    if(acc) {
      return JSON.parse(acc);
    }
  }
  getCart(){
    let cart  = sessionStorage.getItem('cart');
    if(cart) {
      return JSON.parse(cart);
    }
    else{ 
      return []
    }
  }
  saveCart(carts: any){
    let cartJson = JSON.stringify(carts);
    sessionStorage.setItem('cart', cartJson);
  }
}
