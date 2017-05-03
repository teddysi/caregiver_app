import app = require("application");
import platform = require("platform");
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Patient } from "./patient";
import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { Observable as RxObservable } from "rxjs/Rx";
import { DataService } from "../shared/data/data.service";


import "rxjs/add/operator/map";
import "rxjs/add/operator/do";

@Injectable()
export class PatientService {

    public patients: Patient[]

    constructor(private http: Http, private dataService: DataService) {        
    }

    getPatients() {
        //se tem conetividade:
         //futuramente adicionar o token
         /* //request to node server
        let headers = this.createRequestHeader();
       // return this.http.get("http://192.168.0.102:8080/api/v1/patients", { headers: headers }) //Teddy
        return this.http.get("http://192.168.1:100:8080/api/v1/patients", { headers: headers }) //Tiago
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
    }    
}