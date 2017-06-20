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
  providers: [],
  templateUrl: "login/login.html",
  styleUrls: ["login/login-common.css", "login/login.css"],
})

export class LoginComponent implements OnInit{
    auth_user: User;
    isLoggingIn = true; 
    
    constructor(private router: Router, private userService: UserService, private ConnectorService: ConnectorService, private page: Page, private dataService: DataService) {
      this.auth_user = new User();
    }

    ngOnInit() {
      if(this.dataService.isUserAuth()) {
        this.userService.createUser(this.dataService.getLatestUserToRegister()); 
        this.login();
      }
      //this.ConnectorService.testingDownload();
      //tb se pode ponderar a expiração da token. se já tiver mais que XX dias, apagar a token e mostrar janela de login   
    }
    
    submit() {      
      if(this.auth_user.name && this.auth_user.password) {
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
    }  
    login() {
      this.router.navigate(["/patients"]);
    }
    signUp() {
      this.userService.register(this.auth_user).subscribe(
        (result) => this.validRegister(result),
        (error) => this.invalidRegister(error)
      );
    }
    validRegister(result) {
      //console.log(JSON.stringify(result, null, 4));
      this.dataService.setUser(result);
      this.userService.createUser(result);
      
      dialogs.alert({
            title: "Autenticação Validada",
            message: "Bem vindo(a) " + this.auth_user.name,
            okButtonText: "OK"
        }).then(() => {
            console.log("Dialog closed!");
        });
      
      this.dataService.sync();
      this.router.navigate(["/patients"]);
      return true;
    }
    invalidRegister(error) {
    
     dialogs.alert({
            title: "Falha na autenticação.",
            message: "Verifique o seu acesso à Internet e confirme os seus dados de acesso",
            okButtonText: "OK"
        }).then(() => {
            console.log("Dialog closed!");
        });
      return false;
    }
}