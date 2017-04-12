import { Component, OnInit } from "@angular/core";
import app = require("application");
import platform = require("platform");


import { PatientService } from "./patient.service";
import { Patient } from "./patient";

@Component({
    selector: "ns-items",
    moduleId: module.id,
    templateUrl: "./patients.component.html",
})
export class PatientsComponent implements OnInit {
    patients: Patient[];

    constructor(private patientService: PatientService) { 
        
    }

    ngOnInit(): void {
      //subscrever o a lista de pacientes
        this.patientService.getPatients()
            .subscribe(
            (result) => this.onGetDataSuccess(result),
            (error) => this.onGetDataError(error)
            );

    }


    
    private onGetDataSuccess(res) {
        //tratar resposta
        this.patients = res;
        console.log("this.patients " + this.patients)
        //adicionar items à lista de pacientes do service
        this.patientService.setPatients(this.patients)
      
        
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
}
