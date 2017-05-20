import { Component, OnInit } from "@angular/core";
import app = require("application");
import platform = require("platform");
import { PatientService } from "./patient.service";
import { Patient } from "./patient";

import { Router } from "@angular/router";
import { CreateViewEventData } from "ui/placeholder";

import { UserService } from "../shared/user/user.service";

@Component({
    selector: "ns-items",
    moduleId: module.id,
    providers: [],
    styleUrls: ["./patient-common.css"],
    templateUrl: "./patients.component.html", 
})
export class PatientsComponent implements OnInit {
    patients: Patient[];
    listLoaded = false;
    isLoading = false;
   
    public fileTextContent: string;

    public successMessage: string;
    public writtenContent: string;
    public isItemVisible: boolean = false;
    public firstTime: boolean = true;


    constructor(private patientService: PatientService, private router: Router, private userService: UserService) { 

    }
    ngOnInit(): void {
        this.isLoading = true;
        if(this.firstTime) {
            this.patientService.getPatients()
            .subscribe(
            (result) => this.onGetDataSuccess(result),
            (error) => this.onGetDataError(error)
            );
            this.isLoading = false;
            this.listLoaded = true;
        } else {
            //this.patients = this.patientService.getPatients_BD();
        }
        
    }
    private onGetDataSuccess(result) {
    
        this.patients = result;
        
        this.patientService.setPatients(this.patients);
       
        // verificar se a lista tem so um paciente para poder ir logo para a  lista de necessidades  
        if (this.patients.length == 1 && this.firstTime==true) {
            this.firstTime = false;
            //console.log(JSON.stringify(this.patients[0], null, 4));
            //this.router.navigate(["/patient/" + this.patients[0].id + "/needs"]);
        }   

    }
    private onGetDataError(error: Response | any) {
        console.log(error.json());
    }
}
