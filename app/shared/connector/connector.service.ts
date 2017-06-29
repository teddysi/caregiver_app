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
import { UserService } from "../user/user.service";

import * as fs from "file-system";
import * as connectivity from "connectivity";
import 'rxjs/add/operator/map';
var http = require("http");

@Injectable()
export class ConnectorService {

    private connector: Connector;
    private user: User;
    private data: any;
    public connectionType: string;
    
    constructor(private zone: NgZone, private http: Http, private router: Router, private dataService: DataService) {
        //console.log('Instanciou - ConnectorService!');

        this.connector = new Connector();
        //Recebe e monotoriza o tipo de conexão
        this.connectionType = this.getConnectionType();
        //console.log('Connection TYPE: ' + this.connectionType);
        this.startConnectionMonitor();
       
        this.connector.serverURL = '35.184.244.41'; //LIVE
        //this.connector.serverURL = '35.184.244.41/caregivers/public'; //LIVE
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
                        //console.log("Connection type changed to none.");
                        break;
                    case connectivity.connectionType.wifi:
                        this.connectionType = "Wi-Fi";
                        //console.log("Connection type changed to WiFi.");
                        break;
                    case connectivity.connectionType.mobile:
                        this.connectionType = "Mobile";
                        //console.log("Connection type changed to mobile.");
                        break;
                    default:
                        this.connectionType = "Unknown";
                        //console.log("Connection type changed to unknown.");
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
         //console.log('A fazer o request dos dados ao server');
        //se não tem conetividade
        /*if(!this.isConnected() || !this.firstDataRequest) { //Com ERRO
            return this.dataService.getPatientsData();
        }*/
        //se tem conetividade
        let headers = this.createRequestHeader();
        let request = 'http://' + this.connector.serverURL + '/caregiversAPI/' + this.dataService.getUserID() + '/patients'
        console.log("Vai devolver os quizs");
        return this.http.get(request, { headers: headers }) //Tiago
            .map(res => res.json());
        
        //return this.dataService.getPatientsData();
    }

    testingDownload() {
        //console.log('Download Started');
        /*
        var localr;
        var documents = fs.knownFolders.documents();
        var path = fs.path.join(documents.path, "app/materials/test.png");
        console.log(documents.path);
        //var filePath = fs.path.join(path, "test.png");
        http.getFile("https://httpbin.org/image/png", path).then(function (r) {
            console.log(JSON.stringify(r, null, 4));
            localr = r;
        }, function (e) {
            console.log(e);
        });

        var saved =localr.saveToFile(path, "png");
        console.log(saved);
        */
        /*
        var path = fs.path.join(documents.path, "app/localmaterials");
        var folder = fs.Folder.fromPath(path);
        
        folder.getEntities()
        .then(function (entities) {
            // entities is array with the document's files and folders.
            entities.forEach(function (entity) {
                console.log(JSON.stringify(entity, null, 4));
            });
            //console.log(JSON.stringify(documents, null, 4));
        }, function (error) {
        });
        */

    }
    /*
    getAllData(): Observable<Data[]> {
        let headers = this.createRequestHeader();
        let request = "http://" + this.connector.serverURL + "ir buscar todos os materiais";
        
        return this.http.get(request, { headers: headers }).map(res => res.json());
    }

    sync() {
        //console.log('syncing');
        this.syncData()
            .subscribe(
            (result) => this.onGetDataSuccess(result),
            (error) => this.onGetDataError(error)
            ); 
    }

    syncData(): Observable<Data[]> {
        let headers = this.createRequestHeader();
        //console.log('Request to server');
        return this.http.get(Config.apiUrl, { headers: headers })
            .map(res => res.json());
    }
    private onGetDataSuccess(res) {
        //console.log(res);
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
        //console.log("onGetDataError: " + err);
    }
    private createRequestHeader() {
         //console.log('A construir o Header para o request dos dados dos pacientes');
        let headers = new Headers();
        headers.append("Authorization", this.dataService.getToken());
        headers.append("Content-Type", "application/json");
        return headers;
    }
    private createLoginHeader() {
         //console.log('A criar o Header para o login');
      let headers = new Headers();
        // set headers here e.g.
        //headers.append("AuthKey", "my-key");
        //headers.append("AuthToken", "my-token");
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
        if(this.connectionType == 'None') {
            return false;
        }
        return true;
    }
    public updateQuizStatus(questionnaire): Observable<Http> {
        //console.log('A enviar questionário');
        if(!this.isConnected()) {
            return null;
        }
        let headers = this.createLoginHeader();
        let request = 'http://' + this.connector.serverURL + '/caregiversAPI/' + this.dataService.getUserID() + '/quizs/submit';

        //console.log(JSON.stringify(headers), null, 4);
        //console.log(JSON.stringify(questionnaire), null, 4);
        console.log("A enviar quiz guardado: ");
        console.log(JSON.stringify(questionnaire, null, 4));
        return this.http.post(
            request,
            { headers: headers },
            {body: questionnaire}
            ).map(res => res.json());
    }

    sendAcessedMaterial(patient, user, material): Observable<Http> {

        let headers = this.createLoginHeader();
        let request = 'http://' + this.connector.serverURL + '/caregiversAPI/' + this.dataService.getUserID() + '/accesses/create';


        return this.http.post(
            request,
            { headers: headers },
            {body: {
                "patient_id": patient.id,
                "material_id": material.id
            }}
            ).map(res => res.json());
    }

    sendMaterialRating(user,rating): Observable<Http> {
        
        let headers = this.createLoginHeader();
        let request = 'http://' + this.connector.serverURL + '/caregiversAPI/' + this.dataService.getUserID() + '/evaluations/create';
        console.log(JSON.stringify(rating, null, 4));
        return this.http.post(
            request,
            { headers: headers },
            {body: {
                "material_id": rating.id_material,
                "evaluation": rating.evaluation
                }
            }
            ).map(res => res.json());
    }
}