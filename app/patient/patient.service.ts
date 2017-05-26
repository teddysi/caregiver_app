import app = require("application");
import platform = require("platform");
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Patient } from "./patient";
import { Questionnaire } from "../evaluation/questionnaire";
import { Question } from "../evaluation/question";
import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { Observable as RxObservable } from "rxjs/Rx";
import { DataService } from "../shared/data/data.service";
import { ConnectorService } from "../shared/connector/connector.service";
import { UserService } from "../shared/user/user.service";

import "rxjs/add/operator/map";
import "rxjs/add/operator/do";

@Injectable()
export class PatientService {

    public patients: Patient[];

    public caregiverQuestionaires: Questionnaire[];

    private firstTime: boolean;

    
    constructor(private http: Http, private dataService: DataService, private connectorService: ConnectorService) {  
         console.log('Instanciou - PatientService!');
    }
    isFirstRequest() {
        return this.dataService.isPatientsRequestDone();
    }
    getPatients() { 
        return this.connectorService.getPatientsData();
    }
    getPatients_BD() {
        this.patients = this.dataService.getPatientsData();
        console.log(this.patients);
        return this.patients;
    }

    public setPatients(patients) {
        this.dataService.setPatientsData(patients);
        this.patients = patients;
    }


   
  

    getPatient(id: number): Patient {
        return this.patients.filter(patient => patient.id === id)[0];
    }

    //temp

    getCaregiverQuestionnaires(){ // temporario para futuramente alterar
        this.caregiverQuestionaires=[];
        this.caregiverQuestionaires[0].id=0;
        this.caregiverQuestionaires[0].name="questionario teste de caregiver";
        this.caregiverQuestionaires[0].questions=[];
        var a=new Question();
        a.id=0;
        a.question="teste de questao tudo bem";
        a.type="text";
        var b= new Question();
        a.id = 1;
        a.question = "teste de questao radio";
        a.type = "radio";
        a.values = "Sim;Não;Talvez;";
        var b = new Question();
        b.id = 0;
        b.question = "teste de questao tudo bem2";
        b.type = "text";
        var b = new Question();
        b.id = 1;
        b.question = "teste de questao radio2";
        b.type = "radio";
        b.values = "Sim;Não;Talvez;";
        this.caregiverQuestionaires[0].questions.push(a);
        

        
        return this.caregiverQuestionaires;
    }
}




