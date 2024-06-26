import {  Component, OnDestroy, OnInit } from "@angular/core";
import { UserService } from "../../Services/Authentication/user.service";
import { UserDto } from "../../Models/Accout/UserDto";
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";

import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";
import { EditProfileService } from "../../Services/Authentication/Profile/edit-profile.service";
import { Subscription } from "rxjs";
import { NotExpr } from "@angular/compiler";
import { OrderService } from "../../Services/Order/order.service";
import { IOrderAPI, Order } from "../../Models/order";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
@Component({
  selector: "app-profile",
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, TranslateModule],
  templateUrl: "./profile.component.html",
  styleUrl: "./profile.component.css",
})
export class ProfileComponent implements OnInit, OnDestroy {
  editing: boolean = false;
  userData!: any;
  userForm!: FormGroup;

  editProfile() {
    this.editing = !this.editing;
    this.user.userData$.subscribe(userData => {

      this.userData = userData;

    });
  }

  sub!: Subscription;
  CustomerId!: string;

  OrdersList!: Order[];
  orderApiCount!: number;

  lang: string = "en";

  constructor(
    private user: UserService,
    private fb: FormBuilder,
    private router: Router,
    private edit: EditProfileService,
    private OrderService: OrderService,
    private translateService: TranslateService
  ) {}
  
  ngOnInit(): void {
    // Localization
    this.lang = localStorage.getItem("lang") || "en";
    this.translateService.use(this.lang);

    const LocalStorage = localStorage.getItem("userData") as string;
    if (localStorage) {
      this.userData = JSON.parse(LocalStorage);
    }

    this.nmessage = "";
    this.userForm = this.fb.group({
      Image: ["image", Validators.required],
      username: [this.userData.userName, Validators.required],
      email: [this.userData.email, [Validators.required, Validators.email]],
      address: [this.userData.address, Validators.required],
      phone: [this.userData.phoneNumber, Validators.required],
    });

     //GetAllOrdersByCustomerId
     this.sub = this.OrderService.GetAllOrdersByCustomerId(
      this.CustomerId
    ).subscribe({
      next: (OrderAPI: IOrderAPI) => {
        // debugger;
        console.log(OrderAPI);

        this.OrdersList = OrderAPI.order.entities;
        console.log(this.OrdersList);
        
        this.orderApiCount = OrderAPI.order.count;
        console.log(this.orderApiCount);

      },
      error: (error) => {
        console.log("Error: ", error);
      },
    });
  }

 


  nmessage: string = "";

  onSubmit() {
    if (this.userForm.valid) {
      const formData = this.userForm.value;
      this.userData.userName = formData.username;
      this.userData.email = formData.email;
      this.userData.address = formData.address;
      this.userData.phoneNumber = formData.phone;

      this.userData.image = "image.jpg";
      console.log(formData);
      this.sub = this.edit.EditProfile(this.userData).subscribe({
        next: (res) => {
          if (res.message === "The Profile Updated Sucessfully") {
            this.nmessage = res.message;
            this.user.setUserData(this.userData);
            this.editing = false;
          } else {
            this.nmessage =
              "The Profile Can't Be Modified  Call Customer Service";
          }
        },
        error: (error)=>{
          this.nmessage =
          "User Name Or Email Already Exist! , Try Again";
        }
      });

      console.log(formData);
    } else {
      this.nmessage = "The Form Invalid";
      console.log("Form is invalid");
    }
  }
  delete() {
    this.sub = this.edit.DeleteProfile().subscribe({
      next: (res) => {
        console.log(res.message);
      },
    });
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
    this.nmessage = "";
  }
}
