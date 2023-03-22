import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './components/layout-area/header/header.component';
import { ProductListComponent } from './components/product-area/product-list/product-list.component';
import { AboutComponent } from './components/about-area/about/about.component';
import { PageNotFoundComponent } from './components/layout-area/page-not-found/page-not-found.component';
import { HomeComponent } from './components/home-area/home/home.component';
import { AddProductComponent } from './components/product-area/add-product/add-product.component';
import { CartComponent } from './components/cart-area/cart/cart.component';
import { OrderComponent } from './components/order-area/order/order.component';
import { ProductCardComponent } from './components/product-area/product-card/product-card.component';
import { HttpClientModule } from '@angular/common/http';
import { EmptyCartComponent } from './components/cart-area/empty-cart/empty-cart.component';
import { UpdateCartComponent } from './components/cart-area/update-cart/update-cart.component';
import { LoginComponent } from './components/login-area/login/login.component';
import { ContactUsComponent } from './components/about-area/contact-us/contact-us.component';
import { FooterComponent } from './components/layout-area/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './components/login-area/register/register.component';
import { ItemsCartComponent } from './components/cart-area/items-cart/items-cart.component';
import { LoginMenuComponent } from './components/login-area/login-menu/login-menu.component';
import { LayoutAdminComponent } from './components/layout-area/layout-admin/layout-admin.component';
import { MenuAdminComponent } from './components/layout-area/menu-admin/menu-admin.component';
import { LoginMainComponent } from './components/login-area/login-main/login-main.component';
import { MainComponent } from './components/login-area/main/main.component';
import { LayoutUserComponent } from './components/layout-area/layout-user/layout-user.component';
import { MenuUserComponent } from './components/layout-area/menu-user/menu-user.component';
import { HeaderUserComponent } from './components/layout-area/header-user/header-user.component';
import { ProductCardUserComponent } from './components/product-user-area/product-card-user/product-card-user.component';
import { ProductListUserComponent } from './components/product-user-area/product-list-user/product-list-user.component';
import { OrderDetailsComponent } from './components/order-area/order-details/order-details.component';
import { OrderProcessComponent } from './components/order-area/order-process/order-process.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldControl, MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatDialogActions, MatDialogModule } from '@angular/material/dialog';
import { OrderCompleteComponent } from './components/order-area/order-complete/order-complete.component';
import { HighlighterPipe } from './highlighter.pipe';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { MatSidenavModule } from '@angular/material/sidenav';


@NgModule({
  declarations: [
    HeaderComponent,
    ProductListComponent,
    AboutComponent,
    PageNotFoundComponent,
    HomeComponent,
    AddProductComponent,
    CartComponent,
    OrderComponent,
    ProductCardComponent,
    EmptyCartComponent,
    UpdateCartComponent,
    LoginComponent,
    ContactUsComponent,
    FooterComponent,
    RegisterComponent,
    ItemsCartComponent,
    LoginMenuComponent,
    LayoutAdminComponent,
    MenuAdminComponent,
    LoginMainComponent,
    MainComponent,
    LayoutUserComponent,
    MenuUserComponent,
    HeaderUserComponent,
    ProductCardUserComponent,
    ProductListUserComponent,
    OrderDetailsComponent,
    OrderProcessComponent,
    OrderCompleteComponent,
    HighlighterPipe

  ],
  imports: [
    BrowserModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatDialogModule,
    MatDatepickerModule,
    MatButtonToggleModule,
    MatNativeDateModule,
    MatSidenavModule,
    AppRoutingModule,
    FormsModule,//Two way binding
    HttpClientModule, //http
    ReactiveFormsModule, BrowserAnimationsModule
  ],
  exports: [
    MatFormFieldModule,
    MatInputModule,
    MatSidenavModule
  ],
  providers: [],
  bootstrap: [LoginMainComponent]
})
export class AppModule { }
