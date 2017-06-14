import { Component, OnInit } from "@angular/core";
import app = require("application");
import platform = require("platform");
import { User } from "../shared/user/user";
import { UserService } from "../shared/user/user.service";

var phone = require( "nativescript-phone" );

@Component({
    selector: "",
    moduleId: module.id,
    providers: [],
    styleUrls: ["./profile.css"],
    templateUrl: "./profile.component.html",
})
export class ProfileComponent{
    app_user: User;

    constructor(private userService: UserService) {
      this.app_user = new User();
    }

    ngOnInit() {
        this.app_user = this.userService.getUser();
    }

    hasOtherContacts() {
        return true;
    }

    callHealthContact () {
        phone.dial("999999999", true);
        //phone.dial(app_user.healthContact, true);
    }
}