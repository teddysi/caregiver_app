import { Component, OnInit } from '@angular/core';
import app = require("application");
import { ActivatedRoute } from "@angular/router";
import { Patient } from "../patient/patient";
import { Material } from "../material/material";
import { Evaluation } from "../evaluation/evaluation";
import { Need } from "../need/need";
import { PatientService } from "../patient/patient.service";
import buttonModule = require("ui/button");
import { openApp } from "nativescript-open-app";
import { openUrl } from "utils/utils";


import { Questionnaire } from "../evaluation/questionnaire";
import { Question } from "../evaluation/question";

import { ConnectorService } from "../shared/connector/connector.service";
import dialogs = require("ui/dialogs");


@Component({
    selector: 'evaluation-list',
    moduleId: module.id,
    templateUrl: './evaluation-list.component.html',
    styleUrls: ['./evaluation-list.component.css']
})

export class EvaluationListComponent implements OnInit {
    patients: Patient[];
    public caregiverQuestionaires: Questionnaire[];
    public caregiverQuestionairesTemp: Questionnaire[];


    constructor(
        private patientService: PatientService,
        private route: ActivatedRoute,
        private connectorService: ConnectorService
        
    ) { }

    ngOnInit(): void {
        console.log("# COMPONENT LIST EVALUATIONS ")

        //Only questionnaires not done
        this.caregiverQuestionaires=[];
        this.caregiverQuestionairesTemp = this.patientService.getCaregiverQuestionnaires();
        this.caregiverQuestionairesTemp.forEach(element => {
            if (!element.done) {
                this.caregiverQuestionaires.push(element)
            }
        });
        
        this.caregiverQuestionaires.forEach(element => {
            console.log(element.name + " -> DONE: " + element.done)
        });
        //console.log("# QUESTIONNAIRES :" + this.caregiverQuestionaires.toString())

        //test connection
        if (!this.connectorService.isConnected()) {
            console.log("# Sem conneccao ")
            dialogs.alert({
                title: "Aviso - Avaliações ",
                message: "Encontra-se sem acesso à internet. Os seus questionários apenas serão submetidos quando tiver novamente acesso.",
                okButtonText: "OK"
            })
        }

    }

    ngAfterViewInit() {
        if (app.android) {
            app.android.on(app.AndroidApplication.activityBackPressedEvent, this.backEvent);
        }
    }

    ngOnDestroy() {
        // cleaning up references/listeners.
        if (app.android) {
            app.android.off(app.AndroidApplication.activityBackPressedEvent, this.backEvent);
        }
    }

    /**
     * Function to disable back button on android
     * 
     * @param {any} args 
     * @returns 
     * 
     * @memberof PatientsComponent
     */
    backEvent(args) {
        args.cancel = true;
        return;

    }




}