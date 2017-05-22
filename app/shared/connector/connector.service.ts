import { Injectable, OnInit, NgZone } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { Data } from "../data/data";
import { Observable } from 'rxjs/Observable';
import { DataService } from '../data/data.service';
import { Config } from '../config';
import { Router } from "@angular/router";
import { Connector } from "./connector";
import { User } from "../user/user";
import { Database } from "../data/database";
import { Patient } from "../../patient/patient";

import * as connectivity from "connectivity";
import 'rxjs/add/operator/map';

@Injectable()
export class ConnectorService {

    private connector: Connector;
    private user: User;
    private data: any;
    public connectionType: string;
    public firstDataRequest = true;
    
    constructor(private zone: NgZone, private http: Http, private router: Router, private dataService: DataService) {
        console.log('Instanciou - ConnectorService!');

        this.connector = new Connector();
        //Recebe e monotoriza o tipo de conexão
        this.connectionType = this.getConnectionType();
        this.startConnectionMonitor();

        this.connector.serverURL = '35.184.244.41/caregivers/public'; //LIVE
        //this.connector.serverURL = '192.168.99.100/caregivers/public'; //VM-DEV
        

    }
    ngOnInit() {
        
    }
    getConnectionType() {
        let connectionType = connectivity.getConnectionType();
        switch (connectionType) {
            case connectivity.connectionType.none:
                return "None";
            case connectivity.connectionType.wifi:
                return "Wi-Fi";
            case connectivity.connectionType.mobile:
                return "Mobile";
            default:
                return "Unknown";
        }
    }
    startConnectionMonitor() {
        connectivity.startMonitoring((newConnectionType: number) => {
            this.zone.run(() => {
                switch (newConnectionType) {
                    case connectivity.connectionType.none:
                        this.connectionType = "None";
                        console.log("Connection type changed to none.");
                        break;
                    case connectivity.connectionType.wifi:
                        this.connectionType = "Wi-Fi";
                        console.log("Connection type changed to WiFi.");
                        break;
                    case connectivity.connectionType.mobile:
                        this.connectionType = "Mobile";
                        console.log("Connection type changed to mobile.");
                        break;
                    default:
                        this.connectionType = "Unknown";
                        console.log("Connection type changed to unknown.");
                        break;
                }
            });
        });
    }
    requestLogin(username, password): Observable<User> {
        if(!this.isConnected()) {
            return null;
        }
        let headers = this.createLoginHeader();
        let request = 'http://' + this.connector.serverURL + '/caregiversAPI/login';

        return this.http.post(
            request,
            { headers: headers },
             {body:{ username: username, password: password } }
            ).map(res => res.json());
    }

    getPatientsData(): Observable<Patient[]>
    {
        //se não tem conetividade
        if(!this.isConnected() || !this.firstDataRequest) {
            return this.dataService.getPatientsData();
        }
        //se tem conetividade
        this.firstDataRequest = false;
        let headers = this.createRequestHeader();
        let request = 'http://' + this.connector.serverURL + '/caregiversAPI/' + this.dataService.getUserID() + '/patients'
    
        return this.http.get(request, { headers: headers }) //Tiago
            .map(res => res.json());
        
        //return this.dataService.getPatientsData();
    }
    /*
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
    */
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
        headers.append("Authorization", this.dataService.getToken());
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
    public isConnected() {
        if(this.connectionType == 'null') {
            return false;
        }
        return true;
    }
}