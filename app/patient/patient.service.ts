
import { Questionnaire } from "../evaluation/questionnaire";
import { Question } from "../evaluation/question";
import app = require("application");
import platform = require("platform");
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Patient } from "./patient";
import { Notification } from "./notification";
import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { Observable as RxObservable } from "rxjs/Rx";
import { DataService } from "../shared/data/data.service";
import { ConnectorService } from "../shared/connector/connector.service";
import { UserService } from "../shared/user/user.service";

import dialogs = require("ui/dialogs");

import "rxjs/add/operator/map";
import "rxjs/add/operator/do";

@Injectable()
export class PatientService {

    public patients: Patient[];
    public caregiverQuestionaires: Questionnaire[];
    public notifications: Notification[];

    constructor(private http: Http, private dataService: DataService, private connectorService: ConnectorService) {
        console.log('Instanciou - PatientService!');
        this.notifications = [];
        this.initMessages();
    }

    isConnected() {
        return this.connectorService.isConnected();
    }

    isFirstRequest() {
        return this.dataService.isPatientsRequestDone();
    }
    getPatients() {
        return this.connectorService.getPatientsData();
    }
    getPatients_BD() {
        this.patients = this.dataService.getPatientsData();
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
        this.dataService.setQuizs(caregiverQuestionaires);
        this.caregiverQuestionaires = caregiverQuestionaires;
    }

    getCaregiverQuestionnaires(){
        return this.dataService.getQuizs();
    }
    
    hasEvaluationsToDo() {
        return this.dataService.hasEvaluationsToDo();
    /*
        if(this.caregiverQuestionaires) {
            if (this.caregiverQuestionaires.length>0) {
                return true;
            }else{
                return false;
            }
        }
    */
    }
    
    updateQuizStatus(questionnaire) {
        var questionnaire_to_send = [];
        questionnaire_to_send.push(questionnaire);
        this.dataService.updateQuizStatus(questionnaire);
        if(this.connectorService.isConnected()){
        this.connectorService.updateQuizStatus(questionnaire_to_send).subscribe(
            (result) => this.onSentSuccess(questionnaire, result),
            (error) => this.onSentError(questionnaire, error)
        );
        }
    }
    onSentSuccess(questionnaire, result) {
        this.dataService.deleteQuestionnaire(questionnaire);
        console.log("enviou questionário com sucesso");
    }
    onSentError(questionnaire, error) {
        if(error.length == 0) {
            this.dataService.deleteQuestionnaire(questionnaire);
            console.log("enviou questionário com sucesso");
        }
        this.dataService.addQuestionnaireToDB(questionnaire);
        console.log("ERRO NO ENVIO DO QUEST" + JSON.stringify(error, null, 4));
        console.log("falhou envio do questionário");
    }
    userOutdated() {
        this.dataService.deleteData('user');
    }
    initMessages() {
        var pending_evaluations = new Notification('pending evaluations', 'Aviso - Avaliações', 'Existem avaliações pendentes. Por favor aceda às avaliações no canto superior direito.', false)
        

        this.notifications.push(pending_evaluations);
    }

    getNotification(id) {
        var notification = this.notifications.filter(function( obj ) {
            return obj.id === id;
        });

        return notification[0];
    }
    displayNotification(id) {
        let notification = this.getNotification(id);
        if(!notification.done) {
            dialogs.alert({ 
                title: notification.title,
                message: notification.message,
                okButtonText: "OK"
            });
        }
        notification.done = true;
    }
}




