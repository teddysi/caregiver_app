import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { User } from "../shared/user/user";
import { UserService } from "../shared/user/user.service";
import { Router } from "@angular/router";
import { Page } from "ui/page";
import { Color } from "color";
import { View } from "ui/core/view";

@Component({
  selector: "my-app",
  providers: [UserService],
  templateUrl: "login/login.html",
  styleUrls: ["login/login-common.css", "login/login.css"],
})

export class LoginComponent implements OnInit{
    user: User;
    isLoggingIn = true;

    constructor(private router: Router, private userService: UserService, private page: Page) {
      this.user = new User();
    }

    ngOnInit() {
      //se o utilizador tiver token guardada entrar no ecrã seguinte->os meus pacientes e saltar o registo. ou seja aqui faz sempre o login automaticamente com a token.
      //this.login();
      //tb se pode ponderar a expiração da token. se já tiver mais que XX dias, apagar a token e mostrar janela de login
      
    }
    
    submit() {
      //Hardcoded credentials
      this.user.name = "user";
      this.user.password = "password";
      
      this.signUp();
      //this.login();
    }

    /*
    login() {   
        this.userService.login(this.user)
            .subscribe(
            () => this.router.navigate(["/list"]),
            (error) => alert("Unfortunately we could not find your account.")
            );
    }
    */
    signUp() {
      this.userService.register(this.user);
      this.router.navigate(["/patients"]);

       /*
        .subscribe(
          () => {
            alert("Your account was successfully created.");
            //this.toggleDisplay();
          },
          () => alert("Unfortunately we were unable to create your account.")
        );
        */
    }
}