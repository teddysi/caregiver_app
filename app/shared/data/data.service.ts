import * as fs from "file-system";
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { ConnectorService } from '../../shared/connector/connector.service';

import { Injectable } from "@angular/core";
import { Materials } from "./materials";
import { Material } from "../../material/material";
import { Data } from "./data";
import { Needs } from "./needs";
import { Patient } from "../../patient/patient";
import { Couchbase } from "nativescript-couchbase";
import { Database } from "./database";
import { UserService } from '../user/user.service';



@Injectable()
export class DataService {

    public patientsData_id: any;
    public userData_id: any;
    public materials_id: any;
    public ratings_id: any;
    public globalData_id: any;
    public quizs_id: any;
    public quizs_done_id: any;

    public RequestData_control: any;

    public file: fs.File;
    public folder: fs.Folder;
    public folderName: string;
    public fileName: string;
 
    constructor(public database: Database){
            //console.log('Instanciou - DataService!');
            //this.data = database.getDatabase();
            //this.deleteData('quiz');
            //this.deleteData('user');
            //this.deleteData('global');
            //this.deleteData('data');

            //this.showData('data'); //Esta a dar excepcao e a imprimir os users tb???!!!!! (por confirmar) pq n tem dados e estoira?? mas imprime o user pq?
            //this.showData('user');
            //this.showData('materials');
            //this.showData('quiz');
            this.init();
            //this.showData('global');
            
            //
            
    }

    init() {
        //console.log("BD USADA");
        this.showData("quiz");
        //console.log('A inicializar as variáveis globais');
        //Adicionar numero de avaliações pendentes
        //...
        if(this.isGlobalSet()) {
            //console.log('A atualizar global de conexao');
            this.globalData_id = this.getGlobalsID();
            var global = this.database.getDatabase().getDocument(this.globalData_id);
            
            this.database.getDatabase().updateDocument(this.globalData_id, {
                "type": "global",
                "dataRequest": "false",
                "evaluationsToDo" : global.evaluationsToDo
            });
            
            //console.log(JSON.stringify(this.globalData_id));
            
        } else {
            //console.log('A criar objeto para as variáveis globais');
            //criar variável global boolean para dizer se há quizes para fazer update ou n
            this.globalData_id = this.database.getDatabase().createDocument({
                "type": "global",
                "dataRequest": "false",
                "evaluationsToDo" : "false"
            });
            ////console.log('NOVO GLOBAL ID: ' + this.globalData_id);         
        }

        this.userData_id = this.getCurrentUserDocID();
        //console.log("QUIZS USER DOC ID: " + this.userData_id);
        this.patientsData_id = this.getLatestPatientData();
        //console.log("PATIENTS DOC ID: " + this.patientsData_id);
        this.quizs_id = this.getLatestQuizData();
        //console.log("QUIZS DOC ID: " + this.quizs_id);
        //this.quizs_done_id = this.getQuizsOnHold_ID();

        //verificar se há questionários para preencher
        //this.checkQuizStatus();
        
    }
    sync() {
        /*
        this.connectorService.getPatients()
            .subscribe(
            (result) => this.onGetDataSuccess(result),
            (error) => this.onGetDataError(error)
            );
            */
    }
 
    setUser(registeredUser) {
        //console.log('A gravar o utilizador');
        this.userData_id = this.database.getDatabase().createDocument({
            "type": "user",
            "user": registeredUser
        });
        ////console.log("AQUI"+JSON.stringify(this.database.getDatabase().getDocument(this.userData_id, null, 4)));
    }
    setPatients() {

    }
    setMaterials() {

    }
    getPatientsData(){
        //console.log('A devolver todos os dados da BD');
        //console.log(this.patientsData_id);
        return this.database.getDatabase().getDocument(this.patientsData_id).data;
    }
    setPatientsData(data) {
        //debug
        //this.deleteData('data');
        //this.deleteData('materials');
        
        //Todos os dados do paciente e ref _id
        if(this.patientsData_id) {
            //console.log('A atualizar os dados dos pacientes na bd, com o id ' + this.patientsData_id);
            this.database.getDatabase().updateDocument(this.patientsData_id, {
                "data": data,
                "type" : "data"
            });
        } else {
            //console.log('Gravar dados Pacientes');
            this.patientsData_id = this.database.getDatabase().createDocument({
                "type": "data",
                "data": data
            });
        }

        //this.mediaPersistence(data);
        

        //Guarda dados dos Pacientes
        //Guarda dados das necessidades
        var global = this.database.getDatabase().getDocument(this.globalData_id);

        this.database.getDatabase().updateDocument(this.globalData_id, {
            "type" : "global",
            "dataRequest": "true",
            "evaluationsToDo" : global.evaluationsToDo
            
        });
        //ver o get document tb e comparar
        this.showData('global');
    }
    mediaPersistence(data) {
          /**
         * Abrir todo o conteúdo da pasta materials
         */
        var documents = fs.knownFolders.documents();
        var path = fs.path.join(documents.path, "app/materials");

        ////console.log(path);
    }
  
    setNeeds() {

    }
    getToken(): string {
        //console.log('A devolver token');
        return this.database.getDatabase().getDocument(this.userData_id).user.caregiver_token;
    }
    getUserID(): string {
        //console.log('A o ID do user');
        return this.database.getDatabase().getDocument(this.userData_id).user.id;
    }
    getLatestUserToRegister() {
        //console.log("A devolver ultimo utilizador registado")
        var users = this.getAllUsers();
        
        if(users) {
            var lastUser;
            for (var i in users) {
                if (users.hasOwnProperty(i) && typeof(i) !== 'function') {
                    lastUser = users[i];
                    break;
                }
            }
            return lastUser.user;
        }
        return false;
    }
    public deleteData(view) {
        let documents = this.database.getDatabase().executeQuery(view);
        //console.log('A apagar bd: ' + view);
        // loop over all documents
        if(this.database.getDatabase().executeQuery(view).length > 0) {
            for (let i = 0; i < documents.length; i++) {
                // delete each document
                // couchbase will assign an id (_id) to a document when created
                this.database.getDatabase().deleteDocument(documents[i]._id);
            }
        }
    }
    public getAllUsers(){
        if(this.database.getDatabase().executeQuery("user").length > 0) {
            return this.database.getDatabase().executeQuery("user");
        }         
        return false;
    }
    public showData(view) {
        console.log('A mostrar bd: ' + view + ' com ' + this.database.getDatabase().executeQuery(view).length + ' elementos');
        if(this.database.getDatabase().executeQuery(view).length > 0) {     
            console.log(JSON.stringify(this.database.getDatabase().executeQuery(view), null, 4));
        }
    }
     public onCreateFile() {
        // >> fs-create-all-code
        let documents = fs.knownFolders.documents();
        this.folder = documents.getFolder(this.folderName || "testFolder");
        this.file = this.folder.getFile((this.fileName || "testFile") + ".txt");

        
        /*
        this.file.writeText(this.fileTextContent || "some random content")
            .then(result => {
                // Succeeded writing to the file.
                this.file.readText()
                    .then(res => {
                        this.successMessage = "Successfully saved in " + this.file.path;
                        this.writtenContent = res;
                        this.isItemVisible = true;
                    });
            }).catch(err => {
                // Error
            });
        // << fs-create-all-code
        */
    }
    public getCurrentUserDocID() {
        var users = this.getAllUsers();
        
        if(users) {
            var lastUser;
            for (var i in users) {
                if (users.hasOwnProperty(i) && typeof(i) !== 'function') {
                    lastUser = users[i];
                    break;
                }
            }
            return lastUser._id;
        }
        return null;
    }
    public isUserAuth() {
        //console.log('A verificar se existe utilizador na BD');
        if(this.userData_id) {
            return true;
        }
        return false; 
    }
    public setRating(material: Material, level) {
        let patientsData = this.database.getDatabase().getDocument(this.patientsData_id).data;
        
        for(let i = 0; i < patientsData.length; i++) {
            for(let j = 0; j < patientsData[i].needs.length; j++) {
                for(let k = 0; k < patientsData[i].needs[j].materials.length; k++) {
                    
                    if(patientsData[i].needs[j].materials[k].id == material.id) {

                        ////console.log(JSON.stringify(patientsData[i][j][k],null,4));
                        patientsData[i].needs[j].materials[k]['evaluation'] = level;    
                    }
                }
            }
        }
        this.database.getDatabase().updateDocument(this.patientsData_id, {
            "type": "data",
            "data": patientsData,
        })
        
        this.showData("data");
    }
    /*
    //Guarda avaliações dos materiais
    public setRating(rating) {
        /*
        let patientsData = this.database.getDatabase().getDocument(this.patientsData_id).data;
        ////console.log("Entrou no for");
        /*
        for(let i = 0; i < patientsData.length; i++) {
            for(let j = 0; j < patientsData[i].needs.length; j++) {
                for(let k = 0; k < patientsData[i].needs[j].materials.length; k++) {
                        patientsData[i].needs[j].materials[k]['ratings'] = [''];
                    
                }
            }
        }
        *//*
        for(let i = 0; i < patientsData.length; i++) {
            for(let j = 0; j < patientsData[i].needs.length; j++) {
                for(let k = 0; k < patientsData[i].needs[j].materials.length; k++) {
                    
                    if(patientsData[i].needs[j].materials[k].id == rating.id_material) {
                        ////console.log(JSON.stringify(patientsData[i][j][k],null,4));
                        patientsData[i].needs[j].materials[k]['ratings'] = rating;    
                    }
                }
            }
        }
        ////console.log(JSON.stringify(patientsData,null,4));
        this.database.getDatabase().updateDocument(this.patientsData_id, {
            "type": "data",
            "data": patientsData,
        })
        
        this.showData("data");
    }
    */
    public getMaterialRating(material_id) {

    }

    public getNeedMaterials() {
        //console.log('A devolver todos os materiais');
        return this.database.getDatabase().getDocument(this.materials_id).materials;
    }

    public isPatientsRequestDone() {
        //console.log("A verificar se o pedido ao servidor já foi feito");
        if(this.database.getDatabase().getDocument(this.globalData_id).dataRequest == "false") {
            return false;
        }
         return true;
    }
    /**
     * 
     * 
     * @param {any} caregiverQuestionaires 
     * 
     * @memberof DataService
     */
    public setQuizs(caregiverQuestionaires) {

        if(caregiverQuestionaires.length > 0) {
            //console.log("ENTROU AQUI E SETOU O EVALUATIONS A TRUE. Comprimento do array de quizes: " + caregiverQuestionaires.length);
            this.database.getDatabase().updateDocument(this.globalData_id, {
                "evaluationsToDo" : "true",
                "type" : "global",
                "dataRequest" : "true"
            });  
        }

        if(!this.isQuizsSet()) {
            //console.log('Novo doc de Quizs');
            this.quizs_id = this.database.getDatabase().createDocument({
                "type": "quiz",
                "quiz": caregiverQuestionaires
            });
            this.showData('quiz');
        } else {
            var quizs_to_add = [];
            var found_control = false; //variavel de controle de novos quizs a adicionar
            var same_quiz_found = false;

            //console.log('Já existem quizs na BD');
            var quizs = this.getQuizs();
            ////console.log(JSON.stringify(quizs, null, 4));
            caregiverQuestionaires.forEach(questionnaire_server => {
                same_quiz_found = false;
                quizs.forEach(questionnaire_BD => {
                    if(questionnaire_BD.id == questionnaire_server.id && questionnaire_BD.reference == questionnaire_server.reference && questionnaire_BD.reference_name == questionnaire_server.reference_name) {
                        //console.log('Encontrou quiz igual: id-' + questionnaire_BD.id + ' reference-' + questionnaire_BD.reference);
                        same_quiz_found = true;
                    }
                });
                if(!same_quiz_found) {
                    //console.log('Encontrei quizs novos;');
                    found_control = true;
                    quizs_to_add.push(questionnaire_server);
                }             
            });
            //console.log(JSON.stringify(quizs_to_add));
            if(found_control) {
                quizs_to_add.forEach(quiz => {
                    quizs.push(quiz);
                });
            }
            //console.log(JSON.stringify(quizs, null, 4));
            
            //index array
            let index = 0;
            quizs.forEach(element => {
            element.ref_questionnaire = index + "";
            index++;
           
        });
            this.database.getDatabase().updateDocument(this.quizs_id, {
                'quiz' : quizs,
                'type' : 'quiz'
            });
                //console.log(JSON.stringify(this.database.getDatabase().executeQuery('quiz')[0].quiz));
                //console.log(this.database.getDatabase().executeQuery('quiz')[0].quiz.length + ' elementos');           
            }
    }

    public getAllQuizs() {
        //console.log("A obter ID dos quizs");
        if(this.database.getDatabase().executeQuery('quiz').length > 0) {
            ////console.log(JSON.stringify(this.database.getDatabase().executeQuery('quiz'), null, 4));
            return this.database.getDatabase().executeQuery('quiz');
        }
        //console.log('passou aqui');
        return null;
    }
    public getLatestQuizData() {
        var quizs = this.getAllQuizs();

        if(quizs) {
            var lastQuiz;

            lastQuiz = quizs[quizs.length - 1];
            return lastQuiz._id;
        }
        ////console.log('passou aqui-1');
        return null;
    }
    public getLatestPatientData() {
        var patientsData = this.getAllPatientsData();

        if(patientsData) {
            var lastData;

            lastData = patientsData[patientsData.length - 1];
            return lastData._id;
        }
        return null;
    }
    public getQuizs() {
        ////console.log(this.quizs_id);
        ////console.log(JSON.stringify(this.database.getDatabase().getDocument(this.quizs_id)));
        ////console.log(this.database.getDatabase().executeQuery('quiz').length);
        if(this.quizs_id) {
            if(this.database.getDatabase().executeQuery('quiz').length > 0) {        
                return this.database.getDatabase().getDocument(this.quizs_id).quiz;
            }
        }
        return null;
    }
    public isGlobalSet() {
        //console.log("GLOBALSIZE: " + this.database.getDatabase().executeQuery('global').length);
        if(this.database.getDatabase().executeQuery('global').length > 0) {            
            return true;
        }
        return false;
    }
    public getGlobalsID() {
        if(this.database.getDatabase().executeQuery('global').length > 0) {
            ////console.log(JSON.stringify(this.database.getDatabase().executeQuery("global"), null, 4));
            
            return this.database.getDatabase().executeQuery('global')[0]._id;
        }
        return null;
    }
    public getAllPatientsData() {
        if(this.database.getDatabase().executeQuery("data").length > 0) {
            
           // //console.log(JSON.stringify(this.database.getDatabase().executeQuery("data"), null, 4));
            return this.database.getDatabase().executeQuery("data");
        }         
        return false;
    }
    public updateQuizStatus(questionnaire) {        
        var quizs = this.getQuizs();
        if(quizs) {
            quizs.forEach(element_quiz => {
               if(element_quiz.ref_questionnaire == questionnaire.ref_questionnaire) {
                    element_quiz.done = true;
               }
            });
       
            this.database.getDatabase().updateDocument(this.quizs_id, {
                'quiz' : quizs,
                'type' : 'quiz'
            });
            //this.showData('quiz');
            this.checkQuizStatus();
        }
        return null;
    }
    checkQuizStatus() {
        //console.log('A VERIFICAR SE HA QUIZS POR FAZER');
        var quizs = this.getQuizs();
        var global = this.database.getDatabase().getDocument(this.globalData_id);

        if(quizs) {
            ////console.log('passou aqui-2');
            var quiz_done = [];
            var found_quiz_todo = false;
            quiz_done.push(quizs.map(function(quizs){return quizs.done}));
            quiz_done[0].forEach(quiz_result => {
                //console.log("A verificar estado das avaliações");
                //console.log('1: ' + quiz_result);
                
                if(!quiz_result) {
                    found_quiz_todo = true;
                    //console.log("A mudar estado das avaliações");
                    this.database.getDatabase().updateDocument(this.globalData_id, {
                        "evaluationsToDo" : "true",
                        "type" : "global",
                        "dataRequest" : global.dataRequest
                    });   
                }

            });
            if(!found_quiz_todo) {
                this.database.getDatabase().updateDocument(this.globalData_id, {
                    "evaluationsToDo" : "false",
                    "type" : "global",
                    "dataRequest" : global.dataRequest
                });
            }

        } else {
            this.database.getDatabase().updateDocument(this.globalData_id, {
                "evaluationsToDo" : "false",
                "type" : "global",
                "dataRequest" : global.dataRequest
            });
        }
        ////console.log('passou aqui - 3');   
    }
    hasEvaluationsToDo() {
        //this.checkQuizStatus();
        /*
        //console.log('GLOBAL ID: ' + this.globalData_id);
        //console.log(JSON.stringify(this.database.getDatabase().getDocument(this.globalData_id), null, 4));
        //console.log('Evaluations to do:' + this.database.getDatabase().getDocument(this.globalData_id).evaluationsToDo)
        */
        if(this.database.getDatabase().getDocument(this.globalData_id).evaluationsToDo == "true") {
            return true;
        }
        return false;
    }
    isQuizsSet() {
        ////console.log('QUIZ-ID: ' + this.quizs_id);
        if(this.quizs_id) {
            return true;
        }
        return false;
    }
    deleteQuestionnaire(questionnaires) {
        //console.log("A apagar quizs!");
        var quizs = this.getQuizs();
        var found_equal;
        var quizs_temp = [];
            ////console.log(JSON.stringify(quizs, null, 4));
            //console.log("Quizs da BD: ");
            //console.log(JSON.stringify(quizs, null, 4));
            //console.log("Quizs ENVIADOS: ");
            //console.log(JSON.stringify(questionnaires, null, 4));
            quizs.forEach(questionnaire_BD => {
                found_equal = false;
                //console.log("REFERENCIA DO QUIZ BD: " + questionnaire_BD.ref_questionnaire);
                questionnaires.forEach(questionnaire_sent => {
                    //console.log("REFERENCIA DO QUIZ ENVIADO: " + questionnaire_sent.ref_questionnaire);
                    if(questionnaire_sent.ref_questionnaire == questionnaire_BD.ref_questionnaire) {
                        //console.log("REFERENCIA DO QUIZ A ELIMINAR: " + questionnaire_sent.ref_questionnaire);
                       // quizs.splice(questionnaire_BD.ref_questionnaire, 1);
                       found_equal = true;
                    }

                });
                if(!found_equal) {
                    quizs_temp.push(questionnaire_BD);
                }

            });
        //console.log("Numero de quizes por fazer: " + quizs.length);
        //console.log(JSON.stringify(quizs, null, 4));
        quizs = quizs_temp;

        if(quizs.length  == 0) {
            console.log("A apagar doc corrente de quizs");
            this.database.getDatabase().deleteDocument(this.quizs_id);
            this.quizs_id = null;
        } else {
            let index = 0;
            quizs.forEach(element => {
                element.ref_questionnaire = index + "";
                index++;
            });
            console.log('Após reindexação!');
            console.log(JSON.stringify(quizs, null, 4));
            this.database.getDatabase().updateDocument(this.quizs_id, {
                'quiz' : quizs,
                'type' : 'quiz'
            });
        }
        console.log("NOVO ARRAY DE QUIZS NA BD");
        console.log(JSON.stringify(this.database.getDatabase().getDocument(this.quizs_id), null, 4));
    }
    addQuestionnaireToDB(questionnaire) {
        if(!this.isSetQuizsDone()) {
            this.quizs_done_id = this.database.getDatabase().createDocument({
                'type' : 'quizsOnHold',
                'questionnaires' : questionnaire 
            });            
        } else {
            var quizsOnHold_BD = this.getAllQuizsOnHold();
            quizsOnHold_BD.push(questionnaire);

            this.quizs_done_id = this.database.getDatabase().updateDocument({
                'type' : 'quizsOnHold',
                'questionnaires' : quizsOnHold_BD 
            }); 
        }
    }
    isSetQuizsDone() {
        if(this.quizs_done_id) {
            return true;
        }
        return false;
    }
    getQuizsOnHold_ID() {
        if(this.database.getDatabase().executeQuery('quizOnHold').length > 0) {
            ////console.log(JSON.stringify(this.database.getDatabase().executeQuery("quizOnHold"), null, 4));
            return this.database.getDatabase().executeQuery('quizOnHold')[0]._id;
        }
        return null;
    }
    getAllQuizsOnHold() {
        if(this.database.getDatabase().executeQuery('quizOnHold').length > 0) {
            ////console.log(JSON.stringify(this.database.getDatabase().executeQuery("quizOnHold"), null, 4));
            return this.database.getDatabase().executeQuery('quizOnHold').questionnaires;
        }
        return null;
    }
}