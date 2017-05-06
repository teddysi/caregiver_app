import app = require("application");
import platform = require("platform");
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Patient } from "./patient";
import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { Observable as RxObservable } from "rxjs/Rx";
import { DataService } from "../shared/data/data.service";
import {  ConnectorService} from "../shared/connector/connector.service";
import { UserService } from "../shared/user/user.service";


import "rxjs/add/operator/map";
import "rxjs/add/operator/do";

@Injectable()
export class PatientService {

    public patients: Patient[]
    

    constructor(private http: Http, private dataService: DataService,) {  
         
    }

    getPatients() {
        //se tem conetividade:
<<<<<<< HEAD
         //futuramente adicionar o token
         /* //request to node server
=======
         //futuramente adicionar o token console.log("ZZZ -> "+this.dataService.getUserId)
>>>>>>> 49503d25fee8f5eee665ca5ac57ebb8177b46ef7
        let headers = this.createRequestHeader();

        let request = 'http://192.168.99.100/caregivers/public/caregiversAPI/' + this.dataService.getUserID() + '/patients'
        //let request = 'http://192.168.0.35/caregiversAPI/' + "15"+ '/patients'
       // return this.http.get("http://192.168.0.102:8080/api/v1/patients", { headers: headers }) //Teddy
        return this.http.get(request, { headers: headers }) //Tiago
            .map(res => res.json());
        //se não tem conetividade
        //return this.dataService.getData();
        */
        /**
         * Get data vai buscar todos os dados para usar a flow já implementada. No futuro vai buscar os dados dos pacientes
         */
        return this.dataService.getAllData();
    } 


    public setPatients(patients) {
        this.patients = patients;
    }

    getPatient(id: number): Patient {
        return this.patients.filter(patient => patient.id === id)[0];
<<<<<<< HEAD
    }    
}
=======
    }

    /**
     * 
     * 
     * @private
     * @returns 
     * 
     * @memberOf ItemService
     */
    private createRequestHeader() {
        let headers = new Headers();
        // set headers here e.g.
       // headers.append("AuthKey", "my-key");
        //headers.append("AuthToken", "my-token");
        //headers.append("Content-Type", "application/json");
       // headers.append("Authorization","75fQ2nX1M2k2zey0WpIw34JJmqWhzegHfMhU2XN821DGq96Epz37unFZYH1H");
    headers.append("Authorization", this.dataService.getToken());
        return headers;
    }
}




>>>>>>> 49503d25fee8f5eee665ca5ac57ebb8177b46ef7
