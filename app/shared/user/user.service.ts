import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { Observable } from "rxjs/Rx";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";

import { User } from "./user";
import { Config } from "../config";
import { ConnectorService } from "../connector/connector.service";

@Injectable()
export class UserService {
  constructor(private http: Http, private connectorService: ConnectorService) {}
  
  register(user: User) {
    return this.connectorService.requestLogin(user.name, user.password);
  }

  handleErrors(error: Response) {
    console.log(JSON.stringify(error.json()));
    return Observable.throw(error);
  }

  /*
    login(user: User) {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");

        return this.http.post(
            Config.apiUrl + "oauth/token",
            JSON.stringify({
            username: user.email,
            password: user.password,
            grant_type: "password"
            }),
            { headers: headers }
        )
        .map(response => response.json())
        .do(data => {
            Config.token = data.Result.access_token;
        })
        .catch(this.handleErrors);
    }
    */
}

