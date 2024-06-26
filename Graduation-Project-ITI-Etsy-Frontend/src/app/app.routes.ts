import { Routes } from '@angular/router';
import { CartComponent } from './Components/cart/cart.component';
import { ProductListComponent } from './Components/Products/product-list/product-list.component';
import { ProductDetailsComponent } from './Components/Products/product-details/product-details.component';
import { AllcategoriesComponent } from './Components/Category/AllCategory/allcategories/allcategories.component';
import { BaseCategoryComponent } from './Components/BaseCategory/base-category/base-category.component';
import { LoginComponent } from './Components/login/login.component';
import { HomeComponent } from './Components/home/home.component';
import { SearchComponent } from './Components/Search/search.component';
import { HomeSection2BaseCategoryComponent } from './Components/BaseCategory/home-section2-base-category/home-section2-base-category.component';
import { ConfirmComponent } from './Components/PayPal/confirm/confirm.component';
import { userAuthGuard } from './Components/Guard/user-auth.guard';
import { ProfileComponent } from './Components/profile/profile.component';
import { ContactUsComponent } from './Components/ContactUs/contact-us/contact-us.component';


export const routes: Routes = [

    { path: '', redirectTo: 'home', pathMatch: 'full' },

    { path: 'home', component: HomeComponent, title: 'Home' },
    //{path:'about', component:AboutComponent, title:'About'},

    { path: 'Cart', component: CartComponent, title: 'Cart', canActivate:[userAuthGuard]},
    { path: 'Category/:categoryId/Products/:id', component: ProductListComponent, title: 'Products' },
   
    { path: 'Category/:categoryId/Products/:id/ProductDetails/:ProductId', component: ProductDetailsComponent, title: 'Product Details' },
    { path: 'Product/:id', component: ProductDetailsComponent, title: 'Product Details' },
    { path: 'Category/:categoryId', component: AllcategoriesComponent, title: 'Categories' },
    { path: 'BaseCategory', component: BaseCategoryComponent, title: 'Base Category' },
    { path: 'login', component: LoginComponent, title: 'Log in' },
    { path: 'search', component: SearchComponent, title: 'Etsy Search' },
    { path: 'home/Category/:categoryId', component: AllcategoriesComponent, title: 'Categories' },
    { path: 'home/Category/:categoryId/Products/:id', component: ProductListComponent, title: 'Products' },
    { path: 'home/Category/:categoryId/Products/:id/ProductDetails/:ProductId', component: ProductDetailsComponent, title: 'Product Details' },
    { path: 'home/ProductDetails/:ProductId', component: ProductDetailsComponent, title: 'Product Details' },

    { path: 'search/Category/:categoryId', component: AllcategoriesComponent, title: 'Categories' },
    { path: 'search/Category/:categoryId/Products/:id', component: ProductListComponent, title: 'Products' },
    { path: 'search/Category/:categoryId/Products/:id/ProductDetails/:ProductId', component: ProductDetailsComponent, title: 'Product Details' },
    { path: 'search/ProductDetails/:ProductId', component: ProductDetailsComponent, title: 'Product Details' },
    
    { path: 'Confirm', component: ConfirmComponent, title: 'Confirm Payment'/*,canActivate:[userAuthGuard]*/ },


    {path:'userprofile', component:ProfileComponent, title:'User Profile', canActivate:[userAuthGuard]},

    {path:'ContactUs', component:ContactUsComponent, title:'Contact Us'},
    //{path:'register', component:RegisterComponent, title:'register'},

    //{path:'**', component:NotFoundComponent, title:'Not Found'}

];
