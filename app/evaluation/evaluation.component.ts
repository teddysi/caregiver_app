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
    selector: 'evaluation',
    moduleId: module.id,
    templateUrl: './evaluation.component.html',
    styleUrls: ['./evaluation.component.css']
})

export class EvaluationComponent implements OnInit {
 
    questionnaire: Questionnaire;

    constructor(
        private patientService: PatientService,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        console.log("# COMPONENT EVALUATION ")

        //************************************************************************* */
        //para teste -> depois substituir pelo formulario que vem do servidor
        /*this.evaluations = [];
        this.evaluations.push(new Evaluation())
        this.evaluations[0].id = 0;
        this.evaluations[0].description = "Nivel de facilidade";
        this.evaluations.push(new Evaluation())
        this.evaluations[1].id = 1;
        this.evaluations[1].description = "Esta apto para continuar?";
        this.evaluations.push(new Evaluation())
        this.evaluations[2].id = 2;
        this.evaluations[2].description = "Tem experiencia na aplicacao deste material ?";
        //****************************************************************************** */

        //router params
        const ref_questionnaire = +this.route.snapshot.params["ref_questionnaire"];
        
        //Get Questionnaire
        this.questionnaire = this.patientService.caregiverQuestionaires.filter(questionnaire => questionnaire.ref_questionnaire === ref_questionnaire+"")[0];
         
        //transform radio buttons
        this.transformRadioButtons();
     
     console.log("# COMPOMENTE EVALUATION [questionnaire] :"+ ref_questionnaire + " " +this.questionnaire);
    }


    transformRadioButtons(){
        this.questionnaire.questions.forEach(element => {
            
           if (element.type=="radio") {
               var a = element.values.split(";");
               a.pop();
               console.log("# COMPOMENTE EVALUATION valuesToRadio :" +a + " TAMANHO:"+ a.length);
            
               element["valuesToRadio"]=a;

              
           } else{
               element.response = " ";
           }
        });
    }


    /**
     * 
     * 
     * 
     * @memberof EvaluationComponent
     */
    submeterAvaliacao(ref_questionnaire) {

    //set questionnaire done
    this.questionnaire.done=true;

    //TODO - gravar questinario na bd

      console.log("# Evaluation 0 -> " + this.questionnaire.questions[0].response)
      console.log("# Evaluation 0 -> " + this.questionnaire.questions[1].response)

      //  console.log("# Evaluation 1 -> " + this.evaluations[].response)
    }

}