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

    public RequestData_control: any;

    public file: fs.File;
    public folder: fs.Folder;
    public folderName: string;
    public fileName: string;
 
    constructor(public database: Database){
            console.log('Instanciou - DataService!');
            //this.data = database.getDatabase();
            //this.deleteData('global');
            //this.deleteData('user');
            //this.deleteData('global');
            //this.showData('data'); //Esta a dar excepcao e a imprimir os users tb???!!!!! (por confirmar) pq n tem dados e estoira?? mas imprime o user pq?
            //this.showData('user');2
            //this.showData('materials');
            this.showData('global');
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
                "dataRequest": "false"
            });
            console.log('Atualizou');
        } else {
            console.log('A criar objeto para as variáveis globais');
            this.globalData_id = this.database.getDatabase().createDocument({
                "type": "global",
                "dataRequest": "false",
            });
        }
        
        this.userData_id = this.getCurrentUserDocID();
        this.patientsData_id = this.getLatestPatientData();
        this.quizs_id = this.getQuizID();
        
        
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
        console.log(this.patientsData_id);   
        return this.database.getDatabase().getDocument(this.patientsData_id).data;
    }
    setPatientsData(data) {
        console.log('Gravar dados Pacientes');

        //debug
        //this.deleteData('data');
        //this.deleteData('materials');
        
        //Todos os dados do paciente e ref _id
        this.patientsData_id = this.database.getDatabase().createDocument({
            "type": "data",
            "data": data
        });

        //Guarda dados dos Pacientes
        //Guarda dados das necessidades
        
        /*Guarda dados dos materiais e adiciona ratings aos materiais
        let materials = [];
        for(let i = 0; i < data.length; i++) {
            for(let j = 0; j < data[i].needs.length; j++) {
                materials.push(data[i].needs[j].materials); 
            }
        }
        console.log('A criar os ratings nos dados');
        for(let i = 0; i < materials.length; i++) {
            for(let j = 0; j < materials[i].length; j++) {
               materials[i][j]['ratings'] = [''];
            }
        }
        console.log("A guardar os materiais na BD");
        this.materials_id = this.database.getDatabase().createDocument({
                "type": "materials",
                "materials": materials,
        });
        */
        this.database.getDatabase().updateDocument(this.globalData_id, {
            "dataRequest": "true"
        });


        //console.log(JSON.stringify(data[0].needs[0].materials,null,4));

        /*
        console.log('antes do for');
        console.log(JSON.stringify(data[0].needs.materials,null,4));
        //Juntar todos os materiais para colocar rating
        let materials = [];
        for(let i = 0; i < data.length; i++) {
            console.log('no for');
            console.log(JSON.stringify(data[0].needs.materials,null,4));
            materials.push(data[i].needs.materials);
        }
        console.log('MATERIALS');
        console.log(JSON.stringify(materials,null,4));
        this.materials_id = this.database.getDatabase().createDocument({
                "type": "materials",
                "data": materials,
        });
        this.showData('material');
        */
        //console.log("AQUI10"+JSON.stringify(this.database.getDatabase().getDocument(this.patientsData_id).data,null,4));
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
                        console.log('registou');
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
        console.log(this.database.getDatabase().getDocument(this.globalData_id).dataRequest);
        if(this.database.getDatabase().getDocument(this.globalData_id).dataRequest == "false") {
            return false;
        }
         return true;
    }
    public setQuizs(caregiverQuestionaires) {
        console.log("A guardar questionários na BD");
        this.quizs_id = this.database.getDatabase().createDocument({
            "type": "quiz",
            "quiz": caregiverQuestionaires
        });
    }
    public getQuizID() {
        console.log("A obter ID dos quizs")
         if(this.database.getDatabase().executeQuery('quiz').length > 0) {
             //console.log(JSON.stringify(this.database.getDatabase().executeQuery('quiz'), null, 4));
             return this.database.getDatabase().executeQuery('quiz')._id;
         }
         return null;
    }
    public getQuizs() {
        return this.database.getDatabase().getDocument(this.quizs_id).quiz;
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
    public isGlobalSet() {
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
        console.log('Entrou 1');
        if(this.database.getDatabase().executeQuery("data").length > 0) {
            
           // console.log(JSON.stringify(this.database.getDatabase().executeQuery("data"), null, 4));
            return this.database.getDatabase().executeQuery("data");
        }         
        return false;
    }
}