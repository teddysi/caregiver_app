import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { Observable } from "rxjs/Rx";
import { User } from "./user";
import { Config } from "../config";
import { ConnectorService } from "../connector/connector.service";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";

@Injectable()
export class UserService {
    private user: User;

    constructor(private http: Http, private connectorService: ConnectorService) {
        console.log('Instanciou - UserService!');
    }
    
    register(user: User) {
        return this.connectorService.requestLogin(user.name, user.password);
    }

    handleErrors(error: Response) {
        console.log(JSON.stringify(error.json()));
        return Observable.throw(error);
    }
    
    createUser($newUser)
    {
        this.user = new User();
        this.user.id = $newUser.id;
        this.user.username = $newUser.username;
        this.user.name = $newUser.name;
        this.user.email = $newUser.email;
        this.user.location = $newUser.location;
        this.user.token = $newUser.token;
        this.user.created_at = $newUser.created_at;
        this.user.updated_at = $newUser.updated_at;

        console.log('FEZ - 2');
    }
    getUser()
    {
        return this.user;
    }
}

