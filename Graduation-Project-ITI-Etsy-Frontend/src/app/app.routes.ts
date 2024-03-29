import { Routes } from '@angular/router';
import { CartComponent } from './Components/cart/cart.component';
import { ProductListComponent } from './Components/Products/product-list/product-list.component';
import { ProductDetailsComponent } from './Components/Products/product-details/product-details.component';
import { AllcategoriesComponent } from './Components/Category/AllCategory/allcategories/allcategories.component';
import { BaseCategoryComponent } from './Components/BaseCategory/base-category/base-category.component';
import { LoginComponent } from './Components/login/login.component';
import { HomeComponent } from './Components/home/home.component';


export const routes: Routes = [

    {path:'', redirectTo:'home', pathMatch:'full'},
    
    {path:'home', component:HomeComponent, title:'Home'},
    //{path:'about', component:AboutComponent, title:'About'},

    {path:'Cart', component:CartComponent, title:'Cart'},
    {path:'Category/:categoryId/Products/:id', component:ProductListComponent, title:'Products'},
    {path:'Category/:categoryId/Products/:id/ProductDetails/:ProductId', component:ProductDetailsComponent, title:'Product Details'},
    {path:'Product/:id', component:ProductDetailsComponent, title:'Product Details'},
    {path:'Category/:categoryId', component:AllcategoriesComponent, title:'Categories'},
    {path:'BaseCategory', component:BaseCategoryComponent, title:'Base Category'},
    {path:'login', component:LoginComponent, title:'Log in'},
    //{path:'userprofile', component:UserProfileComponent, title:'User Profile', canActivate:[userAuthGuard]},
    //{path:'register', component:RegisterComponent, title:'register'},
    
    //{path:'**', component:NotFoundComponent, title:'Not Found'}

];
