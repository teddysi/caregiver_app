import { Component, OnInit } from "@angular/core";
import app = require("application");
import platform = require("platform");
import { PatientService } from "./patient.service";
import { Patient } from "./patient";
import { Questionnaire } from "../evaluation/questionnaire";

import { Router } from "@angular/router";
import { CreateViewEventData } from "ui/placeholder";

import { UserService } from "../shared/user/user.service";

import dialogs = require("ui/dialogs");

@Component({
    selector: "ns-items",
    moduleId: module.id,
    providers: [],
    styleUrls: ["./patient-common.css"],
    templateUrl: "./patients.component.html",
})
export class PatientsComponent implements OnInit {
    patients: Patient[];
    caregiverQuestionnaires: Questionnaire[];

    listLoaded = false;
    isLoading = false;
    hasEvaluationsToDo = true; //condition to enable action bar icon evaluations

    public fileTextContent: string;

    public successMessage: string;
    public writtenContent: string;
    public isItemVisible: boolean = false;

    constructor(private patientService: PatientService, private router: Router, private userService: UserService) {

    }
    ngOnInit(): void {

        this.isLoading = true;
        console.log(this.patientService.isConnected());
        if (!this.patientService.isFirstRequest() && this.patientService.isConnected()) {
            this.patientService.getPatients().subscribe(
                (result) => this.onGetDataSuccess(result),
                (error) => this.onGetDataError(error)
            );
        } else {
            console.log("A mostrar da BD");
            this.patients = this.patientService.getPatients_BD();
        }

        this.isLoading = false;
        this.listLoaded = true;


        //verify and notificate if has evaluations to do
        this.patientService.hasEvaluationsToDo = true;
        this.hasEvaluationsToDo = this.patientService.hasEvaluationsToDo;
        if (this.hasEvaluationsToDo) {
            dialogs.alert({
                title: "Aviso - Avaliações ",
                message: "Existem avaliações pendentes. Por favor aceda às avaliações no canto superior direito.",
                okButtonText: "OK"
            })
        }

    }
    private onGetDataSuccess(result) {

        this.patients = result.patients; //teddy
        this.caregiverQuestionnaires = result.quizs; //teddy
        this.loadAllQuestionnairesFromResponse();

        console.log("# COMPONENTE PATIENTES [result.quizs]" + JSON.stringify(result.quizs, null, 4));
        console.log("# COMPONENTE PATIENTES [caregiverQuestionnaires ]" + JSON.stringify(this.caregiverQuestionnaires, null, 4));

        this.patientService.setPatients(this.patients);
        this.patientService.setCaregiverQuestionnaires(this.caregiverQuestionnaires);
        // this.patientService.setCaregiverQuestionnaires(this.caregiverQuestionnaire); TODO

        // verificar se a lista tem so um paciente para poder ir logo para a  lista de necessidades  
        /*if (this.patients.length == 1 && this.firstTime==true) {
            this.firstTime = false;*/
        //console.log(JSON.stringify(this.patients[0], null, 4));
        //this.router.navigate(["/patient/" + this.patients[0].id + "/needs"]);
        //}   

    }
    private onGetDataError(error: Response | any) {
        console.log(error.json());
    }

    loadAllQuestionnairesFromResponse() {
        //set ref
        this.patients.forEach(element_p => {
            if (element_p.quizs) {
                element_p.quizs.forEach(element_q => {
                    this.caregiverQuestionnaires.push(element_q)
                });
            }
            element_p.needs.forEach(element_need => {
                element_need.materials.forEach(element_mat => {
                    element_mat.quizs.forEach(element_qu => {
                        this.caregiverQuestionnaires.push(element_qu)
                    });
                });
            });

        });
        let index = 0;
        this.caregiverQuestionnaires.forEach(element => {
            element.ref_questionnaire = index + "";
            index++;

        });


    }

}
