
import { Questionnaire } from "../evaluation/questionnaire";
import { Question } from "../evaluation/question";
import app = require("application");
import platform = require("platform");
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Patient } from "./patient";
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
    public hasEvaluationsToDo: boolean;

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

    setCaregiverQuestionnaires(caregiverQuestionaires){
this.caregiverQuestionaires=caregiverQuestionaires
    }

    getCaregiverQuestionnaires(){ // temporario para futuramente alterar
       /* this.caregiverQuestionaires=[];
        var quest_ = new Questionnaire();

        this.caregiverQuestionaires[0]=quest_;
        this.caregiverQuestionaires[0].id=0;
        this.caregiverQuestionaires[0].name="questionario teste de caregiver";
        this.caregiverQuestionaires[0].reference="caregiver";
        this.caregiverQuestionaires[0].reference_id="1";
        this.caregiverQuestionaires[0].ref_questionnaire="1"; //referencia interna
        this.caregiverQuestionaires[0].questions=[];
        var a=new Question();
        a.id=0;
        a.question="teste de questao tudo bem";
        a.type="text";
        
        var b= new Question();
        b.id = 1;
        b.question = "teste de questao radio";
        b.type = "radio";
        b.values = "Sim;Não;Talvez;";
        var c = new Question();
      c.id = 0;
      c.question = "teste de questao tudo bem2";
      c.type = "text";
        var d = new Question();
        d.id = 1;
        d.question = "teste de questao radio2";
        d.type = "radio";
        d.values = "Sim;Não;Talvez;";
        this.caregiverQuestionaires[0].questions.push(a);
        this.caregiverQuestionaires[0].questions.push(b);
        this.caregiverQuestionaires[0].questions.push(c);
        this.caregiverQuestionaires[0].questions.push(d);
        var quest_1= new Questionnaire();
        
        quest_1.id = 0;
        quest_1.name = "questionario teste de material";
        quest_1.reference = "material";
        quest_1.reference_id = "1";
        quest_1.ref_questionnaire = "2"; //referencia interna
        quest_1.questions = [];
        var a = new Question();
        a.id = 0;
        a.question = "teste de questao tudo bem";
        a.type = "text";

        var b = new Question();
        b.id = 1;
        b.question = "teste de questao radio";
        b.type = "radio";
        b.values = "Sim;Não;Talvez;";
        var c = new Question();
        c.id = 0;
        c.question = "teste de questao tudo bem2";
        c.type = "text";
        var d= new Question();
        d.id = 1;
        d.question = "teste de questao radio2";
        d.type = "radio";
        d.values = "Sim;Não;Talvez;";
        
        this.caregiverQuestionaires.push(quest_1);
        this.caregiverQuestionaires[1].questions.push(a);
        this.caregiverQuestionaires[1].questions.push(b);
        this.caregiverQuestionaires[1].questions.push(c);
        this.caregiverQuestionaires[1].questions.push(d);
*/
        return this.caregiverQuestionaires;
    }
}




