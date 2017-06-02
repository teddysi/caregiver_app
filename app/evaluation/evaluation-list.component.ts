import { Component, OnInit } from '@angular/core';
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
        private route: ActivatedRoute
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
    }



}