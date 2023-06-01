import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { BlogComponent } from './components/blog/blog.component';
import { BlogDetailComponent } from './components/blog-detail/blog-detail.component';
import { ContactComponent } from './components/contact/contact.component';
import { AccountLoginComponent } from './components/account-login/account-login.component';
import { ProductComponent } from './components/product/product.component';
import { ProductCartComponent } from './components/product-cart/product-cart.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { MyAccountComponent } from './components/my-account/my-account.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProductDetailCategoryComponent } from './components/product-detail-category/product-detail-category.component';
import { AccountRegisterComponent } from './components/account-register/account-register.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    BlogComponent,
    BlogDetailComponent,
    ContactComponent,
    AccountLoginComponent,
    ProductComponent,
    ProductCartComponent,
    ProductDetailComponent,
    MyAccountComponent,
    WishlistComponent,
    CheckOutComponent,
    HeaderComponent,
    FooterComponent,
    ProductDetailCategoryComponent,
    AccountRegisterComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
