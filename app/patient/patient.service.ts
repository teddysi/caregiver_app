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

    public patients: Patient[];
    private firstTime: boolean;
    
    constructor(private http: Http, private dataService: DataService, private connectorService: ConnectorService) {  
         console.log('Instanciou - PatientService!');
         this.firstTime = true;
    }

    getPatients(){  
        return this.connectorService.getPatientsData();
   
    }
    getPatients_BD() {
        return this.dataService.getPatientsData();
    }

    public setPatients(patients) {
        this.dataService.setPatientsData(patients);
        this.patients = patients;
    }

    getPatient(id: number): Patient {
        return this.patients.filter(patient => patient.id === id)[0];
    }
}




