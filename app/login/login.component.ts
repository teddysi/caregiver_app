import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { User } from "../shared/user/user";
import { UserService } from "../shared/user/user.service";
import { ConnectorService } from "../shared/connector/connector.service";
import { DataService } from "../shared/data/data.service";
import { Router } from "@angular/router";
import { Page } from "ui/page";
import { Color } from "color";
import { View } from "ui/core/view";

@Component({
  selector: "my-app",
  providers: [UserService, ConnectorService],
  templateUrl: "login/login.html",
  styleUrls: ["login/login-common.css", "login/login.css"],
})

export class LoginComponent implements OnInit{
    user: User;
    isLoggingIn = true; 
    constructor(private router: Router, private userService: UserService, private ConnectorService: ConnectorService, private page: Page, private dataService: DataService) {
      this.user = new User();
    }

    ngOnInit() {
      var user_token = this.dataService.getToken();
     
      if(user_token) {
        console.log(user_token);
        this.login();
      }
      //se o utilizador tiver token guardada entrar no ecrã seguinte->os meus pacientes e saltar o registo. ou seja aqui faz sempre o login automaticamente com a token.
      //
      //tb se pode ponderar a expiração da token. se já tiver mais que XX dias, apagar a token e mostrar janela de login
      
    }
    
    submit() {      
      if(this.user.name && this.user.password) {
        this.signUp();
      } else {
        alert("Por favor complete os campos.");
      }
      
      //this.login();
    }

    
    login() {   
      this.router.navigate(["/patients"])  
    }
    signUp() {
      this.userService.register(this.user).subscribe(
        (result) => this.validRegister(result),
        (error) => this.invalidRegister(error)
      );
    }

    validRegister(user) {
      this.dataService.setUser(user);
      this.router.navigate(["/patients"])
      return true;
    }

    invalidRegister(error) {
      alert("Utilizador não identificado.");
      console.log(error);
      return false;
    }
}