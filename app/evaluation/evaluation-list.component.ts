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
    need: Need;
    materialsOfAllNeeds: Material[];
    materialParent: Material; //é o material
    evaluations: Evaluation[];

    constructor(
        private patientService: PatientService,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        console.log("# COMPONENT LIST EVALUATIONS ")
        this.caregiverQuestionaires=this.patientService.getCaregiverQuestionnaires();   
        console.log("# QUESTIONNAIRES :" +this.caregiverQuestionaires.toString())    
    }



}