import { Injectable, OnInit } from "@angular/core";
import 'rxjs/add/operator/map';
import { Http, Headers, Response } from "@angular/http";
import { Data } from "../data/data";
import { Observable } from 'rxjs/Observable';
import { DataService } from '../data/data.service';
import { Config } from '../config';
import { Router } from "@angular/router";
import { Connector } from "./connector";
import { User } from "../user/user";
import { Database } from "../data/database";


@Injectable()
export class ConnectorService {

    private connector: Connector;
    private user: User;
    private data: any;
    
    constructor(private http: Http, private router: Router) {
        //this.connector.serverURL = Config.apiUrl;
    }

    ngOnInit() {
        
    }

    requestLogin(username, password): Observable<User> {
        let headers = this.createLoginHeader();
        //let request = "http://192.168.1.100/" + '/caregivers/login?username=' + username + '&' + 'password=' + password;
        let request = "http://192.168.1.100/caregivers/login?username=fidel46&password=carepw";

        return this.http.post(request, { headers: headers })
            .map(res => res.json());
    } 

    sync() {
        console.log('syncing');
        this.syncData()
            .subscribe(
            (result) => this.onGetDataSuccess(result),
            (error) => this.onGetDataError(error)
            ); 
    }

    syncData(): Observable<Data[]> {
        let headers = this.createRequestHeader();
        console.log('Request to server');
        return this.http.get(Config.apiUrl, { headers: headers })
            .map(res => res.json());
    }


        private onGetDataSuccess(res) {
        console.log(res);
        DataService.prototype.setData(res);
        
        this.router.navigate(["/patients"]);
        //adicionar items à lista de pacientes do service
        //this.DataService.setPatients(this.patients);
        
        // verificar se a lista tem so um paciente para poder ir logo para a  lista de necessidades  
        //if (this.patients.length == 1) {
        //    this.router.navigate(["/patient/1/needs"]);
       // }   

    }

    /**
     
     * @private
     * @param {(Response | any)} error 
     * 
     * @memberOf ItemsComponent
     */
    private onGetDataError(error: Response | any) {
        const body = error.json() || "";
        const err = body.error || JSON.stringify(body);
        console.log("onGetDataError: " + err);
    }

    private createRequestHeader() {
        let headers = new Headers();
        headers.append("Authorization", this.connector.accessToken);
        headers.append("Content-Type", "application/json");
        return headers;
    }

    private createLoginHeader() {
      let headers = new Headers();
        // set headers here e.g.
        headers.append("AuthKey", "my-key");
        headers.append("AuthToken", "my-token");
        headers.append("Content-Type", "application/json");
        return headers;
    }
}