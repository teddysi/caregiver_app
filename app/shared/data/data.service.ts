import * as fs from "file-system";
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { ConnectorService } from '../../shared/connector/connector.service';

import { Injectable } from "@angular/core";
import { Materials } from "./materials";
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
            console.log('Instanciou - DataService!');
            //this.data = database.getDatabase();
            this.deleteData('quiz');
            //this.deleteData('user');
            //this.deleteData('global');
            //this.showData('data'); //Esta a dar excepcao e a imprimir os users tb???!!!!! (por confirmar) pq n tem dados e estoira?? mas imprime o user pq?
            //this.showData('user');
            //this.showData('materials');
            //this.showData('quiz');
            this.init();
            //this.showData('global');
            
            //
            
    }

    ngOnInit() {
        console.log("Correu o INIT do DATASERVICE"); 
    }
    init() {
        console.log('A inicializar as variáveis globais');
        //Adicionar numero de avaliações pendentes
        //...
        
        if(this.isGlobalSet()) {
            console.log('A atualizar global de conexao'); 
            this.globalData_id = this.getGlobalsID();
            this.database.getDatabase().updateDocument(this.globalData_id, {
                "dataRequest": "false",
            });
            
            console.log(JSON.stringify(this.database.getDatabase().getDocument(this.globalData_id)));
            
        } else {
            console.log('A criar objeto para as variáveis globais');
            //criar variável global boolean para dizer se há quizes para fazer update ou n
            this.globalData_id = this.database.getDatabase().createDocument({
                "type": "global",
                "dataRequest": "false",
                "evaluationsToDo" : "false"
            });             
        }

        this.userData_id = this.getCurrentUserDocID();
        this.patientsData_id = this.getLatestPatientData();
        this.quizs_id = this.getLatestQuizData();
        this.quizs_done_id = this.getQuizsOnHold_ID();

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
        console.log('A gravar o utilizador');
        this.userData_id = this.database.getDatabase().createDocument({
            "type": "user",
            "user": registeredUser
        });
        //console.log("AQUI"+JSON.stringify(this.database.getDatabase().getDocument(this.userData_id, null, 4)));
    }
    setPatients() {

    }
    setMaterials() {

    }
    getPatientsData(){
        console.log('A devolver todos os dados da BD');
        return this.database.getDatabase().getDocument(this.patientsData_id).data;
    }
    setPatientsData(data) {
        //debug
        //this.deleteData('data');
        //this.deleteData('materials');
        
        //Todos os dados do paciente e ref _id
        if(this.patientsData_id) {
            console.log('A atualizar os dados dos pacientes na bd, com o id ' + this.patientsData_id);
            this.database.getDatabase().updateDocument(this.patientsData_id, {
                "data": data
            });
        } else {
            console.log('Gravar dados Pacientes');
            this.patientsData_id = this.database.getDatabase().createDocument({
                "type": "data",
                "data": data
            });
        }

        this.mediaPersistence(data);
        

        //Guarda dados dos Pacientes
        //Guarda dados das necessidades
        var $global = this.database.getDatabase().getDocument(this.globalData_id);

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

        console.log(path);
    }
  
    setNeeds() {

    }
    getToken(): string {
        console.log('A devolver token');
        return this.database.getDatabase().getDocument(this.userData_id).user.caregiver_token;
    }
    getUserID(): string {
        console.log('A devolver o ID do user');
        return this.database.getDatabase().getDocument(this.userData_id).user.id;
    }
    getLatestUserToRegister() {
        console.log("A devolver ultimo utilizador registado")
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
        console.log('A apagar bd: ' + view);
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
        console.log('A verificar se existe utilizador na BD');
        if(this.userData_id) {
            return true;
        }
        return false; 
    }
    //Guarda avaliações dos materiais
    public setRating(rating) {
        console.log('A registar o rating');
        //Recebo o rating, com id do material
        //Vou à BD dos materiais
        //Para cada material com aquele id, atualizar o seu rating.
        /*Isto altera a bd dos materiais.
        let materials = this.database.getDatabase().getDocument(this.materials_id).materials;
        
        for(let i = 0; i < materials.length; i++) {
            for(let j = 0; j < materials[i].length; j++) {
                if(rating.id_material === materials[i][j].id) {
                    console.log('registou');
                    materials[i][j].ratings.push(rating);
                }
            }
        }
        //console.log(JSON.stringify(materials, null, 4));
        
        this.database.getDatabase().updateDocument(this.materials_id, {
            "type": "materials",
            "materials": materials,
        })
        
        //this.showData('materials');
        FIM da alteração na BD dos materiais*/
        /*Assim altera a BD dos pacientes*/
        //console.log(JSON.stringify(this.database.getDatabase().getDocument(this.patientsData_id).data,null,4));
        let patientsData = this.database.getDatabase().getDocument(this.patientsData_id).data;
        //console.log("Entrou no for");
        /*
        for(let i = 0; i < patientsData.length; i++) {
            for(let j = 0; j < patientsData[i].needs.length; j++) {
                for(let k = 0; k < patientsData[i].needs[j].materials.length; k++) {
                        patientsData[i].needs[j].materials[k]['ratings'] = [''];
                    
                }
            }
        }
        */
        for(let i = 0; i < patientsData.length; i++) {
            for(let j = 0; j < patientsData[i].needs.length; j++) {
                for(let k = 0; k < patientsData[i].needs[j].materials.length; k++) {
                    
                    if(patientsData[i].needs[j].materials[k].id == rating.id_material) {
                        //console.log(JSON.stringify(patientsData[i][j][k],null,4));
                        patientsData[i].needs[j].materials[k]['ratings'] = rating;    
                    }
                }
            }
        }
        //console.log(JSON.stringify(patientsData,null,4));
        this.database.getDatabase().updateDocument(this.patientsData_id, {
            "type": "data",
            "data": patientsData,
        })
        
        //this.showData("data");
    }
    public getMaterialRating(material_id) {

    }

    public getNeedMaterials() {
        console.log('A devolver todos os materiais');
        return this.database.getDatabase().getDocument(this.materials_id).materials;
    }

    public isPatientsRequestDone() {
        console.log("A verificar se o pedido ao servidor já foi feito");
        if(this.database.getDatabase().getDocument(this.globalData_id).dataRequest == "false") {
            return false;
        }
         return true;
    }
    public setQuizs(caregiverQuestionaires) {
        if(!this.isQuizsSet()) {
            console.log('entrou');
            this.quizs_id = this.database.getDatabase().createDocument({
                "type": "quiz",
                "quiz": caregiverQuestionaires
            });
        } else {
            console.log('AQUI!!!!!!!!!!!!!!')
            var quizs = this.getQuizs();
            //console.log(JSON.stringify(quizs, null, 4));
            var quizs_final = this.getQuizs();
            var caregiverQuestionaires_ids = new Array();
            var quizs_ids = new Array();
            var quizs_ids_to_add_to_BD = new Array();
            var quizs_same_id = new Array();
            var found_control;
            var index_control = -1;

            caregiverQuestionaires_ids.push(caregiverQuestionaires.map(function(questionnaire){
                var quest = {};
                quest[questionnaire.id] = questionnaire.reference;
                return quest;
            }));
            //console.log('aqui');
            //console.log(JSON.stringify(caregiverQuestionaires_ids, null, 4));
            quizs_ids.push(quizs.map(function(questionnaire){return questionnaire.id}));
           //console.log(JSON.stringify(quizs_ids, null, 4));
           
           //para cada questão do questionário remoto
           caregiverQuestionaires_ids[0].forEach(questionnaire_server_id => {
                //Controlo se encontrou match a false e de index do questionário a 0
               found_control = false;
               index_control++;
               //Para cada questionário da BD
               quizs_ids[0].forEach(questionnaire_BD_id => {                    
                    //se encontrar match
                    if(questionnaire_server_id.id == questionnaire_BD_id.id && questionnaire_server_id.reference == questionnaire_BD_id.reference) {
                        //encontrou
                        found_control = true;
                        //mete num array
                        quizs_same_id.push(questionnaire_server_id);
                        return;
                    }
               });
               //se n encontrou match
                console.log('terminou for');
               if(!found_control) {
                   console.log('ENTROU');
                   //adiciona-o como quiz a acrescentar na BD
                   quizs_ids_to_add_to_BD.push(questionnaire_server_id);
                   quizs_final.push(caregiverQuestionaires[index_control]);
               }
           });
           console.log('A mostrar quizs a sobrepor')
            console.log(JSON.stringify(quizs_final, null, 4));
            this.database.getDatabase().updateDocument(this.quizs_id, {
                'quiz' : quizs_final,
                'type' : 'quiz'
            });
        }
        console.log('A mostrar BD-QUIZ!')
        this.showData('quiz');
    }
    public checkQuestionnaire_reference(id) {

    }
    public getAllQuizs() {
        console.log("A obter ID dos quizs");
        if(this.database.getDatabase().executeQuery('quiz').length > 0) {
            //console.log(JSON.stringify(this.database.getDatabase().executeQuery('quiz'), null, 4));
            return this.database.getDatabase().executeQuery('quiz');
        }
        console.log('passou aqui');
        return null;
    }
    public getLatestQuizData() {
        var quizs = this.getAllQuizs();

        if(quizs) {
            var lastQuiz;

            lastQuiz = quizs[quizs.length - 1];
            return lastQuiz._id;
        }
        console.log('passou aqui-1');
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
        return this.database.getDatabase().getDocument(this.quizs_id).quiz;
    }
    public isGlobalSet() {
        console.log("GLOBALSIZE: " + this.database.getDatabase().executeQuery('global').length);
        if(this.database.getDatabase().executeQuery('global').length > 0) {            
            return true;
        }
        return false;
    }
    public getGlobalsID() {
        if(this.database.getDatabase().executeQuery('global').length > 0) {
            console.log(JSON.stringify(this.database.getDatabase().executeQuery("global"), null, 4));
            
            return this.database.getDatabase().executeQuery('global')[0]._id;
        }
        return null;
    }
    public getAllPatientsData() {
        if(this.database.getDatabase().executeQuery("data").length > 0) {
            
           // console.log(JSON.stringify(this.database.getDatabase().executeQuery("data"), null, 4));
            return this.database.getDatabase().executeQuery("data");
        }         
        return false;
    }
    public updateQuizStatus(questionnaire) {        
        var quizs = this.getQuizs();
        if(quizs) {
            quizs.forEach(element_quiz => {
                if(element_quiz.id == questionnaire.id) {
                    //console.log('ENTROU');
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
        var quizs = this.getQuizs();
        if(quizs) {
            console.log('passou aqui-2');
            var quiz_done = [];

            quiz_done.push(quizs.map(function(quizs){return quizs.done}));
            quiz_done[0].forEach(quiz_result => {
                console.log("A verificar estado das avaliações");
                console.log('1: ' + quiz_result);
                
                if(quiz_result == 'false') {
                    console.log("A mudar estado das avaliações");
                    this.database.getDatabase().updateDocument(this.globalData_id, {
                        "evaluationsToDo" : "true"
                    });
                }
            });
        }
        console.log('passou aqui - 3');
        return null;   
    }
    hasEvaluationsToDo() {
        console.log('GLOBAL ID: ' + this.globalData_id);
        console.log(JSON.stringify(this.database.getDatabase().getDocument(this.globalData_id), null, 4));
        console.log('Evaluations to do:' + this.database.getDatabase().getDocument(this.globalData_id).evaluationsToDo)
        /*
        if(this.database.getDatabase().getDocument(this.globalData_id).evaluationsToDo == "true") {
            return true;
        }
        return false;
        */
        return true;
    }
    isQuizsSet() {
        console.log('QUIZ-ID: ' + this.quizs_id);
        if(this.quizs_id) {
            return true;
        }
        return false;
    }
    deleteQuestionnaire(questionnaire) {
        //apagar o questionario que foi enviado da BD. Não é urgente pq depois de feito fica oculto
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
            //console.log(JSON.stringify(this.database.getDatabase().executeQuery("quizOnHold"), null, 4));
            return this.database.getDatabase().executeQuery('quizOnHold')[0]._id;
        }
        return null;
    }
    getAllQuizsOnHold() {
        if(this.database.getDatabase().executeQuery('quizOnHold').length > 0) {
            //console.log(JSON.stringify(this.database.getDatabase().executeQuery("quizOnHold"), null, 4));
            return this.database.getDatabase().executeQuery('quizOnHold').questionnaires;
        }
        return null;
    }
}