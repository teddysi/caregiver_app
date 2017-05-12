import app = require("application");
import platform = require("platform");
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Patient } from "./patient";
import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { Observable as RxObservable } from "rxjs/Rx";
import { DataService } from "../shared/data/data.service";
import { ConnectorService } from "../shared/connector/connector.service";
import { UserService } from "../shared/user/user.service";

import "rxjs/add/operator/map";
import "rxjs/add/operator/do";

@Injectable()
export class PatientService {

    public patients: Patient[]
    

    constructor(private http: Http, private dataService: DataService, private connectorService: ConnectorService) {  
         
    }

    getPatients()
    {
        /*
        //se tem conetividade:
         //futuramente adicionar o token console.log("ZZZ -> "+this.dataService.getUserId)
        let headers = this.createRequestHeader();

        let request = 'http://35.184.17.4/caregivers/public/caregiversAPI/' + this.dataService.getUserID() + '/patients'
        //let request = 'http://192.168.99.100/caregivers/public/caregiversAPI/' + this.dataService.getUserID() + '/patients'
        // return this.http.get("http://192.168.0.102:8080/api/v1/patients", { headers: headers }) //Teddy
        return this.http.get(request, { headers: headers }) //Tiago
            .map(res => res.json());
        //se não tem conetividade
        //return this.dataService.getData();
        */
        return this.connectorService.getPatientsData();

    } 


    public setPatients(patients) {
        this.patients = patients;
    }

    getPatient(id: number): Patient {
        return this.patients.filter(patient => patient.id === id)[0];
    }
}




