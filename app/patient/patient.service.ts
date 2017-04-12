import app = require("application");
import platform = require("platform");


import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Patient } from "./patient";
import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { Observable as RxObservable } from "rxjs/Rx";

import "rxjs/add/operator/map";
import "rxjs/add/operator/do";

@Injectable()
export class PatientService {

    public patients: Patient[]


    constructor(private http: Http) { }


    getPatients(): Observable<Patient[]> {
         //futuramente adicionar o token
        let headers = this.createRequestHeader();
        return this.http.get("http://192.168.33.12:8080/api/v1/patients", { headers: headers })
            .map(res => res.json());

    }


    public setPatients(patients) {
        this.patients = patients
    }


   
    getPatient(id: number): Patient {

        return this.patients.filter(patient => patient.id === id)[0];
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
        headers.append("AuthKey", "my-key");
        headers.append("AuthToken", "my-token");
        headers.append("Content-Type", "application/json");
        return headers;
    }
}




