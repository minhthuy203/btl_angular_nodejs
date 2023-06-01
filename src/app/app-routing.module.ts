import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { AccountLoginComponent } from './components/account-login/account-login.component';
import { AccountRegisterComponent } from './components/account-register/account-register.component';
import { BlogDetailComponent } from './components/blog-detail/blog-detail.component';
import { BlogComponent } from './components/blog/blog.component';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { ContactComponent } from './components/contact/contact.component';
import { HomeComponent } from './components/home/home.component';
import { MyAccountComponent } from './components/my-account/my-account.component';
import { ProductCartComponent } from './components/product-cart/product-cart.component';
import { ProductDetailCategoryComponent } from './components/product-detail-category/product-detail-category.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductComponent } from './components/product/product.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';

const routes: Routes = [
  {path: '', component:HomeComponent},
  {path: 'about', component:AboutComponent},
  {path: 'blog', component:BlogComponent},
  {path: 'blog-detail', component:BlogDetailComponent},
  {path: 'contact', component:ContactComponent},
  {path: 'my-account', component:MyAccountComponent},
  {path: 'product', component:ProductComponent},
  {path: 'product-cart', component:ProductCartComponent},
  {path: 'product-detail/:id', component:ProductDetailComponent},
  {path: 'wishlist', component:WishlistComponent},
  {path: 'account-login', component:AccountLoginComponent},
  {path: 'check-out', component:CheckOutComponent},
  {path: 'category/:id', component:ProductDetailCategoryComponent},
  {path: 'account-register', component:AccountRegisterComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
