import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FooterComponent } from '../Footer/footer/footer.component';
import { CartComponent } from '../../../cart/cart.component';
import { ProductListComponent } from '../../../Products/product-list/product-list.component';
import { ProductDetailsComponent } from '../../../Products/product-details/product-details.component';
import { Router, RouterModule } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from '../../../../Services/Authentication/auth.service';
import $ from 'jquery'; 

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ FooterComponent, CartComponent, ProductListComponent, ProductDetailsComponent,RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy {

  isDropdownOpen: boolean = false;
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
    const dropdownMenu = document.getElementById('dropdown-menu');
    if (dropdownMenu) {
      dropdownMenu.style.display = this.isDropdownOpen ? 'block' : 'none';

    }
  }
  
  isDropdownOpenForBell: boolean = false;

  toggleDropdownBell() {
    this.isDropdownOpen = !this.isDropdownOpen;
    const dropdownMenu = document.getElementById('bellDropdownMenu');
    if (dropdownMenu) {
      dropdownMenu.style.display = this.isDropdownOpen ? 'block' : 'none';
    }
  }

  isDropdownOpenForProfile: boolean = false;

  toggleDropdownProfile() {
    this.isDropdownOpen = !this.isDropdownOpen;
    const dropdownMenu = document.getElementById('profileDropdownMenu');
    if (dropdownMenu) {
      dropdownMenu.style.display = this.isDropdownOpen ? 'block' : 'none';
    }
  }



  private destroySubject = new Subject();
  isLoggedIn: boolean = false;
  constructor(private authService: AuthService,
  private router: Router) {
  this.authService.authStatus
       .pipe(takeUntil(this.destroySubject))
       .subscribe(result => {
  this.isLoggedIn = result;
       })
   }
  onLogout(): void {
  this.authService.logout();
  this.router.navigate(["/"]);
   }
  ngOnInit(): void {
  this.isLoggedIn = this.authService.isAuthenticated();
   }
  ngOnDestroy() {
  this.destroySubject.next(true);
  this.destroySubject.complete();
   }

  


  }

  
 
