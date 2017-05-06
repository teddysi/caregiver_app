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
    
<<<<<<< HEAD
    constructor(private http: Http, private router: Router) {
        this.connector = new Connector();
        this.connector.serverURL = '192.168.0.43';
=======
    constructor(private http: Http, private router: Router, private dataService: DataService) {
        this.connector = new Connector();
        this.connector.serverURL = '192.168.99.100/caregivers/public';
>>>>>>> 49503d25fee8f5eee665ca5ac57ebb8177b46ef7
    }

    ngOnInit() {
        
    }

    requestLogin(username, password): Observable<User> {
        let headers = this.createLoginHeader();
<<<<<<< HEAD
        //let request = 'http://' + this.connector.serverURL + '/caregivers/login?username=' + username + '&' + 'password=' + password;
        let request = "http://" + this.connector.serverURL + "/caregivers/login?username=fidel46&password=carepw";

        return this.http.post(request, { headers: headers })
            .map(res => res.json());
=======
       //link server virtual box
        let request = 'http://192.168.99.100/caregivers/public/caregiversAPI/login';

        return this.http.post(
            request,
            { headers: headers },
             {body:{ username: username, password: password } }
            ).map(res => res.json());
>>>>>>> 49503d25fee8f5eee665ca5ac57ebb8177b46ef7
    }

    getAllData(): Observable<Data[]> {
        let headers = this.createRequestHeader();
        let request = "http://" + this.connector.serverURL + "ir buscar todos os materiais";
        
        return this.http.get(request, { headers: headers }).map(res => res.json());
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

    public getConnector() {
        return this.connector;
    }
    public setConnectorToken(user_token) {
        this.connector.accessToken = user_token;
    }
}