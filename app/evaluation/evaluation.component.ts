import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import app = require("application");
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
        //console.log("# COMPONENT EVALUATION ")
       
        //router params
        const ref_questionnaire = +this.route.snapshot.params["ref_questionnaire"];
        //console.log("REF_QUEST: " + ref_questionnaire);
        //Dá erro depois de apagar um questionário, no caso de ficar com a mesma ref
        this.questionnaire = this.dataService.getQuizs().filter(questionnaire => questionnaire.ref_questionnaire === ref_questionnaire + "")[0];
        //transform radio buttons
        this.transformRadioButtons();

        //console.log("# COMPOMENTE EVALUATION [questionnaire] :" + ref_questionnaire + " " + this.questionnaire);

        
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
               // //console.log("# COMPOMENTE EVALUATION valuesToRadio :" + a + " TAMANHO:" + a.length);
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
        console.log("RESPONSE DE RADIO BUTTONS: " + response);
        this.questionnaire.questions[indexQuestion].response = response;
    }

    /**
     *
     *   
     * FÕ,Nuntion to save evaluation
     * 
     * @memberof EvaluationComponent
     */
    submitEvaluation(questionnaire) {
        //set questionnaire done
        this.questionnaire.done = true;
        console.log(JSON.stringify(questionnaire, null, 4));
        for(let i = 0; i < this.questionnaire.questions.length; i++) {
            console.log("Elemento: " + i);
            console.log(JSON.stringify(this.questionnaire.questions[i], null, 4));
            if(this.questionnaire.questions[i]['valuesToRadio']) {
                for(let j = 0; j < this.questionnaire.questions[i]['valuesToRadio'].length; j++) {
                //console.log( this.questionnaire.questions[i]['valuesToRadio'].length);
                    if(this.questionnaire.questions[i]['valuesToRadio'][j] === questionnaire.questions[i].response) {
                        this.questionnaire.questions[i].response = j.toString();
                    }
                }
            }     
        }
        console.log("ARRAY FINAL: ");
        console.log(JSON.stringify(this.questionnaire, null, 4));
        //update local data
        ////console.log(JSON.stringify(this.questionnaire), null, 4);
        this.patientService.updateQuizStatus(this.questionnaire);
        
       
        //test connection
        if (!this.connectorService.isConnected()) {
            dialogs.alert({
                title: "Aviso - Avaliações ",
                message: "Encontra-se sem acesso à internet. O seu questionário apena será submetido quando tiver novamente acesso.",
                okButtonText: "OK"
            })
        }

        //return to the list od of questionnaires
        this.router.navigate(['/patients']);
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