import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { User } from "../shared/user/user";
import { UserService } from "../shared/user/user.service";
import { ConnectorService } from "../shared/connector/connector.service";
import { DataService } from "../shared/data/data.service";
import { Router } from "@angular/router";
import { Page } from "ui/page";
import { Color } from "color";
import { View } from "ui/core/view";

import dialogs = require("ui/dialogs");

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
        this.userService.createUser(this.dataService.getLatestUserToRegister());
        
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
        dialogs.alert({
            title: "Aviso - Autenticação",
            message: "Por favor complete os campos.",
            okButtonText: "OK"
        }).then(() => {
            console.log("Dialog closed!");
        });
      }
      
      //this.login();
    }

    
    login() {
      console.log('AQUI');
      console.log(JSON.stringify(this.userService.getUser()));
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
      this.userService.createUser(this.dataService.getLatestUserToRegister());

      dialogs.alert({
            title: "Autenticação Validada",
            message: "Bem vindo(a) " + user.name,
            okButtonText: "OK"
        }).then(() => {
            console.log("Dialog closed!");
        });
      
      this.router.navigate(["/patients"]);
      return true;
    }

    invalidRegister(error) {
     dialogs.alert({
            title: "Aviso - Autenticação",
            message: "Os dados introduzidos não são válidos.",
            okButtonText: "OK"
        }).then(() => {
            console.log("Dialog closed!");
        });
      return false;
    }

    saveUserSuccessfull(result)
    {
      console.log('User saved in BD and Object created');
      return true;
    }

    saveUserError(error)
    {
      console.log('User wasnt saved');
      console.log(error);
    }
}