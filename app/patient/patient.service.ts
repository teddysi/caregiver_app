
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
    //public caregiverQuestionaires: Questionnaire[];
    public notifications: Notification[];

    constructor(private http: Http, private dataService: DataService, private connectorService: ConnectorService, private userService: UserService) {
        //console.log('Instanciou - PatientService!');
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

    setCaregiverQuestionnaires(caregiverQuestionaires) {
        
        this.dataService.setQuizs(caregiverQuestionaires); 
        //this.caregiverQuestionaires = caregiverQuestionaires;
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
            (result) => this.onSentSuccess(questionnaire_to_send, result),
            (error) => this.onSentError(questionnaire_to_send, error)
        );
        }
    }
    onSentSuccess(questionnaire_to_send, result) {
         console.log("Questionário enviado:");
        this.dataService.deleteQuestionnaire(questionnaire_to_send);
        //console.log("enviou questionário com sucesso");
    }
    onSentError(questionnaire_to_send, error) {
        //console.log("ERROR: " + error);
        //console.log("ERROR LENGTH: " + error.length);
        if(error.length == undefined) {
             console.log("Questionário enviado:");
            //console.log(JSON.stringify(questionnaire_to_send, null, 4));
            this.dataService.deleteQuestionnaire(questionnaire_to_send);
            //console.log("enviou questionário com sucesso");
        } else {
            //this.dataService.addQuestionnaireToDB(questionnaire);
            //console.log("ERRO NO ENVIO DO QUEST" + JSON.stringify(error, null, 4));
            //console.log("falhou envio do questionário");
        }
        
    }
    userOutdated() {
        this.dataService.deleteData('user');
    }
    initMessages() {
        this.notifications = [
            new Notification('pending evaluations', 'Aviso - Avaliações', 'Existem avaliações pendentes. Por favor aceda às avaliações no canto superior direito.', false),
            new Notification('error-auth', 'Aviso - Autenticação', 'O acesso aos pacientes não foi autorizado. Por favor reinicie a aplicação.', false)
        ]
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
    checkQuizsToSubmit() {
        let quizs = this.dataService.getQuizs();
        let quizs_to_send = [];

        if(quizs) {
            console.log("QUIZS GUARDADOS: ");
            console.log(JSON.stringify(quizs, null, 4));
            quizs.forEach(quiz => {
                if(quiz.done) {
                    quizs_to_send.push(quiz);
                }
            });
            console.log("QUIZS GUARDADOS PARA ENVIO: ");
            console.log(JSON.stringify(quizs_to_send, null, 4));
            if(quizs_to_send) {
                this.connectorService.updateQuizStatus(quizs_to_send).subscribe(
                    (result) => this.onSentSuccess(quizs_to_send, result),
                    (error) => this.onSentError(quizs_to_send, error)
                );
            }
        }
    }
    registerAcessedMaterial(patient, material) {
        var user = this.userService.getUser();

        this.connectorService.sendAcessedMaterial(patient, user,material).subscribe(
            (result) => this.registeredSuccessfully(result, material),
            (error) => this.registeredFailed(error)
        );
    }
    registeredSuccessfully(result, material) {
        console.log("Registou acesso ao material: ID - " + material.id + '-' + material.name);
    }

    registeredFailed(error) {
        console.log(JSON.stringify(error,null,4));
        console.log("Falhou registo de acesso ao material");
    }
    sendRating(rating) {
         var user = this.userService.getUser();

        this.connectorService.sendMaterialRating(user,rating).subscribe(
            (result) => this.evaluationSentSuccessfully(result, rating),
            (error) => this.evaluationSentFail(error)
        );
    }
    evaluationSentSuccessfully(result, rating) {
        console.log("Enviou rating do material com sucesso");
    }

    evaluationSentFail(error) {
        console.log("Falhou envio do rating do material");
    }
}




