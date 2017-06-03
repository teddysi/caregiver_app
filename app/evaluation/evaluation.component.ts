import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Patient } from "../patient/patient";
import { Material } from "../material/material";
import { Evaluation } from "../evaluation/evaluation";
import { Need } from "../need/need";
import { PatientService } from "../patient/patient.service";
import { DataService } from "../shared/data/data.service";
import buttonModule = require("ui/button");
import { openApp } from "nativescript-open-app";
import { openUrl } from "utils/utils";
import { Router } from "@angular/router";

import { Questionnaire } from "../evaluation/questionnaire";
import { Question } from "../evaluation/question";

import { ConnectorService } from "../shared/connector/connector.service";
import dialogs = require("ui/dialogs");



@Component({
    selector: 'evaluation',
    moduleId: module.id,
    templateUrl: './evaluation.component.html',
    styleUrls: ['./evaluation.component.css']
})

export class EvaluationComponent implements OnInit {

    questionnaire: Questionnaire;

    constructor(
        private patientService: PatientService,
        private route: ActivatedRoute,
        private router: Router,
        private dataService: DataService,
        private connectorService: ConnectorService
    ) {
        this.questionnaire = new Questionnaire();
    }

    ngOnInit(): void {
        console.log("# COMPONENT EVALUATION ")

        //router params
        const ref_questionnaire = +this.route.snapshot.params["ref_questionnaire"];

        //Get Questionnaire
        console.log(JSON.stringify(this.patientService.caregiverQuestionaires, null, 4));
        this.questionnaire = this.patientService.caregiverQuestionaires.filter(questionnaire => questionnaire.ref_questionnaire === ref_questionnaire + "")[0];

        //transform radio buttons
        this.transformRadioButtons();

        console.log("# COMPOMENTE EVALUATION [questionnaire] :" + ref_questionnaire + " " + this.questionnaire);

        
    }




    /**
     * Funtion to create array of values to put on radiobutton's questions
     * 
     * 
     * @memberof EvaluationComponent
     */
    transformRadioButtons() {
        this.questionnaire.questions.forEach(element => {
            if (element.type == "radio") {
                var a = element.values.split(";");
                a.pop();
               // console.log("# COMPOMENTE EVALUATION valuesToRadio :" + a + " TAMANHO:" + a.length);
                element["valuesToRadio"] = a;
            } 
        });
    }




    /**
     * 
     * 
     * @param {any} response  response of the radiobutton question
     * @param {any} indexQuestion index of the question of questionnaire
     * 
     * @memberof EvaluationComponent
     */
    public setResponse(response, indexQuestion) {
        this.questionnaire.questions[indexQuestion].response = response;
    }



    /**
     * 
     * Funtion to save evaluation
     * 
     * @memberof EvaluationComponent
     */
    submmitEvaluation() {
        //set questionnaire done
        this.questionnaire.done = true;
        //update local data
        this.dataService.updateQuizStatus(this.questionnaire);
       
        //test connection
        if (this.connectorService.isConnected) {
            dialogs.alert({
                title: "Aviso - Avaliações ",
                message: "Encontra-se sem acesso à internet. O seu questionário apena será submetido quando tiver novamente acesso.",
                okButtonText: "OK"
            })
        }

        //return to the list od of questionnaires
        this.router.navigate(['/evaluations']);
    }

}